from pathlib import Path
import re
import shutil
import textwrap

from PIL import Image, ImageDraw, ImageFont
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.util import Inches, Pt
from reportlab.lib import colors
from reportlab.lib.pagesizes import landscape
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Image as RLImage,
    PageBreak,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
OUTP = ROOT / "PPTs"
OUTPDF = ROOT / "PDFs"
AS = ROOT / "docs" / "assets"

for directory in (OUTP, OUTPDF, AS):
    directory.mkdir(parents=True, exist_ok=True)

# Remove old generated files so stale/clumsy versions cannot remain in the repo.
for directory, patterns in (
    (OUTP, ("*.pptx", "*_Preview.pdf")),
    (OUTPDF, ("*.pdf",)),
    (AS, ("*.png",)),
):
    for pattern in patterns:
        for old_file in directory.glob(pattern):
            old_file.unlink()

for old_file in (ROOT / "BUILD_TRIGGER.txt", ROOT / "tools" / "fsd2_source_bundle.b64"):
    if old_file.exists():
        old_file.unlink()
for old_file in (ROOT / "tools").glob("fsd2_bundle_*.b64"):
    old_file.unlink()


NAVY = RGBColor(27, 43, 75)
BLUE = RGBColor(48, 93, 156)
LIGHT_BLUE = RGBColor(232, 241, 252)
DARK = RGBColor(35, 39, 47)
GREY = RGBColor(102, 110, 122)
LIGHT_GREY = RGBColor(244, 246, 249)
WHITE = RGBColor(255, 255, 255)
GREEN = RGBColor(42, 122, 89)
ORANGE = RGBColor(214, 126, 45)


def read_text(path):
    return path.read_text(encoding="utf-8")


def title_tasks(readme):
    lines = read_text(readme).splitlines()
    title = "FSD2 Lab Experiment"
    tasks = []
    for line in lines:
        if line.startswith("# "):
            title = line[2:].strip()
        if line.startswith("- "):
            tasks.append(line[2:].strip())
    return title, tasks


def load_font(size=34):
    for name in ("DejaVuSans.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            pass
    return ImageFont.load_default()


def make_diagram(path, title, mode):
    width, height = 1600, 900
    image = Image.new("RGB", (width, height), "white")
    draw = ImageDraw.Draw(image)
    draw.text((70, 45), title, font=load_font(46), fill=(27, 43, 75))

    if mode == "workflow":
        boxes = [
            ("1. Input", "Browser / terminal"),
            ("2. Process", "Express / React"),
            ("3. Data", "State / database"),
            ("4. Output", "Screen / API"),
        ]
    else:
        boxes = [
            ("1. Start", "Run the program"),
            ("2. Enter", "Give sample input"),
            ("3. Execute", "Logic runs"),
            ("4. Observe", "See the result"),
        ]

    x_positions = [55, 430, 805, 1180]
    for index, (heading, detail) in enumerate(boxes):
        x = x_positions[index]
        draw.rounded_rectangle(
            (x, 285, x + 315, 525),
            radius=24,
            fill=(232, 241, 252),
            outline=(48, 93, 156),
            width=5,
        )
        draw.text((x + 25, 330), heading, font=load_font(32), fill=(27, 43, 75))
        draw.text((x + 25, 395), detail, font=load_font(25), fill=(55, 62, 72))
        if index < len(boxes) - 1:
            draw.line((x + 315, 405, x + 365, 405), fill=(48, 93, 156), width=8)
            draw.polygon(
                [(x + 365, 405), (x + 345, 392), (x + 345, 418)],
                fill=(48, 93, 156),
            )

    footer = "FSD2 learning aid • Follow the flow from left to right"
    draw.text((70, 720), footer, font=load_font(27), fill=(102, 110, 122))
    image.save(path)


def clean_line(line):
    return line.replace("\t", "  ").rstrip()


def collect_code_files(folder):
    files = []
    for path in folder.rglob("*"):
        if path.is_file() and path.suffix.lower() in {".js", ".jsx", ".ejs", ".html", ".css", ".scss"}:
            if "node_modules" not in path.parts and "dist" not in path.parts:
                files.append(path)
    return sorted(files)


def get_code_chunks(folder, max_lines=12):
    code_files = collect_code_files(folder)
    chunks = []
    for code_file in code_files[:4]:
        lines = [clean_line(line) for line in read_text(code_file).splitlines()]
        lines = [line for line in lines if line.strip()]
        if not lines:
            continue
        # Prefer the beginning because it normally contains imports, setup and the main idea.
        for start in range(0, min(len(lines), 24), max_lines):
            part = lines[start:start + max_lines]
            if part:
                chunks.append((code_file.name, start + 1, part))
            if len(chunks) >= 2:
                break
        if len(chunks) >= 2:
            break
    return chunks


def add_full_bg(slide, color=WHITE):
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    shape.line.fill.background()
    slide.shapes._spTree.remove(shape._element)
    slide.shapes._spTree.insert(2, shape._element)


def add_text(slide, text, x, y, w, h, size=20, color=DARK, bold=False,
             font_name="Aptos", align=PP_ALIGN.LEFT, valign=MSO_ANCHOR.TOP):
    box = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    frame = box.text_frame
    frame.clear()
    frame.word_wrap = True
    frame.margin_left = Inches(0.05)
    frame.margin_right = Inches(0.05)
    frame.margin_top = Inches(0.03)
    frame.margin_bottom = Inches(0.03)
    frame.vertical_anchor = valign
    paragraph = frame.paragraphs[0]
    paragraph.text = text
    paragraph.alignment = align
    paragraph.font.name = font_name
    paragraph.font.size = Pt(size)
    paragraph.font.bold = bold
    paragraph.font.color.rgb = color
    return box


def add_header(slide, title, subtitle=None):
    add_text(slide, title, 0.65, 0.38, 12.0, 0.65, size=28, color=NAVY, bold=True)
    bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.65), Inches(1.08), Inches(1.25), Inches(0.07))
    bar.fill.solid()
    bar.fill.fore_color.rgb = BLUE
    bar.line.fill.background()
    if subtitle:
        add_text(slide, subtitle, 2.05, 0.43, 10.5, 0.45, size=15, color=GREY)


def add_card(slide, x, y, w, h, title, body, accent=BLUE, body_size=17):
    card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(x), Inches(y), Inches(w), Inches(h))
    card.fill.solid()
    card.fill.fore_color.rgb = LIGHT_GREY
    card.line.color.rgb = RGBColor(220, 225, 232)
    card.line.width = Pt(1)
    add_text(slide, title, x + 0.22, y + 0.18, w - 0.44, 0.38, size=19, color=accent, bold=True)
    add_text(slide, body, x + 0.22, y + 0.67, w - 0.44, h - 0.84, size=body_size, color=DARK)
    return card


def add_bullets_slide(prs, title, items, subtitle=None):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_full_bg(slide)
    add_header(slide, title, subtitle)
    y = 1.55
    for item in items[:7]:
        add_text(slide, "•", 0.85, y, 0.35, 0.35, size=22, color=BLUE, bold=True)
        add_text(slide, item, 1.25, y - 0.02, 11.0, 0.62, size=19, color=DARK)
        y += 0.75
    return slide


def add_code_slide(prs, title, filename, start_line, lines):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_full_bg(slide)
    add_header(slide, title, f"{filename} • starting at line {start_line}")
    code_box = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.65), Inches(1.45), Inches(12.0), Inches(5.45))
    code_box.fill.solid()
    code_box.fill.fore_color.rgb = RGBColor(248, 250, 252)
    code_box.line.color.rgb = RGBColor(210, 216, 224)
    code_text = "\n".join(f"{start_line + i:>3}  {line}" for i, line in enumerate(lines))
    add_text(slide, code_text, 0.92, 1.72, 11.45, 4.95, size=15, color=DARK, font_name="DejaVu Sans Mono")
    return slide


def add_image_slide(prs, title, image_path, caption):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_full_bg(slide)
    add_header(slide, title)
    slide.shapes.add_picture(str(image_path), Inches(0.65), Inches(1.45), width=Inches(12.0))
    add_text(slide, caption, 0.85, 6.85, 11.6, 0.35, size=14, color=GREY, align=PP_ALIGN.CENTER)
    return slide


def add_output_slide(prs, title, experiment_title):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_full_bg(slide)
    add_header(slide, title, experiment_title)
    add_card(slide, 0.75, 1.55, 3.65, 2.05, "Input", "Enter the sample values or open the required page / route.", BLUE)
    add_card(slide, 4.85, 1.55, 3.65, 2.05, "Processing", "The Express route, React component, hook, or MongoDB command performs the task.", GREEN)
    add_card(slide, 8.95, 1.55, 3.65, 2.05, "Output", "Check the browser, terminal, API response, or database result.", ORANGE)
    add_text(slide, "What to verify", 0.8, 4.15, 3.0, 0.45, size=22, color=NAVY, bold=True)
    checks = [
        "No syntax errors appear in the terminal.",
        "The requested feature responds to the input.",
        "The displayed / returned value matches the operation.",
    ]
    y = 4.8
    for item in checks:
        add_text(slide, "✓", 0.9, y, 0.35, 0.35, size=20, color=GREEN, bold=True)
        add_text(slide, item, 1.3, y - 0.02, 10.9, 0.45, size=18, color=DARK)
        y += 0.58
    return slide


def add_title_slide(prs, title, experiment_number):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    add_full_bg(slide, LIGHT_BLUE)
    add_text(slide, f"FSD2 LAB • EXPERIMENT {experiment_number}", 0.8, 1.0, 11.7, 0.45, size=18, color=BLUE, bold=True)
    add_text(slide, title, 0.8, 1.85, 11.7, 1.5, size=38, color=NAVY, bold=True)
    add_text(slide, "Simple explanation • Clean code • Runtime pathway • Viva preparation", 0.8, 3.65, 11.2, 0.55, size=20, color=GREY)
    add_text(slide, "FSD2 Lab Materials", 0.8, 6.35, 4.0, 0.4, size=16, color=BLUE, bold=True)
    return slide


def make_preview_pdf(path, title, experiment_number, tasks, workflow, runtime, code_chunks):
    page_w, page_h = landscape((11 * inch, 6.1875 * inch))
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle("Title", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=24, textColor=colors.HexColor("1B2B4B"), leading=28, spaceAfter=12)
    h_style = ParagraphStyle("H", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=18, textColor=colors.HexColor("1B2B4B"), leading=22, spaceAfter=8)
    body_style = ParagraphStyle("Body", parent=styles["BodyText"], fontName="Helvetica", fontSize=12, textColor=colors.HexColor("23272F"), leading=16)
    code_style = ParagraphStyle("Code", parent=body_style, fontName="Courier", fontSize=9.5, leading=12)

    doc = SimpleDocTemplate(
        str(path), pagesize=(page_w, page_h),
        leftMargin=0.55 * inch, rightMargin=0.55 * inch,
        topMargin=0.45 * inch, bottomMargin=0.45 * inch,
        title=title,
    )
    story = []
    story += [Paragraph(f"FSD2 LAB • EXPERIMENT {experiment_number}", body_style), Spacer(1, 8), Paragraph(title, title_style)]
    story += [Paragraph("Clean GitHub preview of the presentation. The matching .pptx is in the same PPTs folder.", body_style), PageBreak()]

    story += [Paragraph("1. Syllabus tasks", h_style)]
    task_data = [[Paragraph(f"• {task}", body_style)] for task in tasks[:8]]
    table = Table(task_data, colWidths=[9.75 * inch])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("F4F6F9")),
        ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor("DCE1E8")),
        ("INNERGRID", (0, 0), (-1, -1), 0.3, colors.HexColor("E6EAF0")),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]))
    story += [table, PageBreak()]

    story += [Paragraph("2. Workflow", h_style), RLImage(str(workflow), width=9.75 * inch, height=5.49 * inch), PageBreak()]

    for index, (filename, start_line, lines) in enumerate(code_chunks, start=1):
        story += [Paragraph(f"3.{index}. Code pathway — {filename}", h_style)]
        code = "<br/>".join(
            f"{start_line + i:>3}  {line.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')}"
            for i, line in enumerate(lines)
        )
        story += [Table([[Paragraph(code, code_style)]], colWidths=[9.75 * inch], style=TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("F8FAFC")),
            ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor("D2D8E0")),
            ("LEFTPADDING", (0, 0), (-1, -1), 12),
            ("RIGHTPADDING", (0, 0), (-1, -1), 12),
            ("TOPPADDING", (0, 0), (-1, -1), 10),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ])), PageBreak()]

    story += [Paragraph("4. Runtime", h_style), RLImage(str(runtime), width=9.75 * inch, height=5.49 * inch), PageBreak()]
    story += [Paragraph("5. Run and observe", h_style)]
    for item in [
        "Start the server / Vite app or open the MongoDB shell as described in the experiment README.",
        "Enter the sample input or call the required route.",
        "Watch the terminal for logs and errors.",
        "Verify the browser, API response, or database result.",
    ]:
        story.append(Paragraph(f"• {item}", body_style))
        story.append(Spacer(1, 5))
    story += [Spacer(1, 10), Paragraph("6. Viva questions", h_style)]
    for item in [
        "What is the input?",
        "Which line performs the main operation?",
        "What is the output?",
        "What changes if the input is changed?",
    ]:
        story.append(Paragraph(f"• {item}", body_style))
    doc.build(story)


def build(folder):
    title, tasks = title_tasks(folder / "README.md")
    number = folder.name[:2]
    slug = re.sub(r"[^A-Za-z0-9]+", "_", title).strip("_")
    workflow = AS / f"{number}_workflow.png"
    runtime = AS / f"{number}_runtime.png"
    make_diagram(workflow, title, "workflow")
    make_diagram(runtime, "Runtime walkthrough — " + title, "runtime")

    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    add_title_slide(prs, title, number)
    add_bullets_slide(prs, "Syllabus tasks", tasks or ["See the experiment README for the exact task."])
    add_image_slide(prs, "How it works", workflow, "Request / value flows from input to processing to data and output.")

    code_chunks = get_code_chunks(folder)
    if code_chunks:
        for index, chunk in enumerate(code_chunks, start=1):
            add_code_slide(prs, f"Code pathway {index}", *chunk)
    else:
        add_bullets_slide(prs, "Code pathway", [
            "Open the database query file described in the README.",
            "Execute the commands in the given order.",
            "Observe how each command reads or changes the database.",
        ])

    add_image_slide(prs, "Runtime walkthrough", runtime, "Start → enter input → execute → observe output.")
    add_output_slide(prs, "Expected result", title)
    add_bullets_slide(prs, "Viva preparation", [
        "What is the purpose of this experiment?",
        "Which input is required?",
        "Which line / command performs the main operation?",
        "What output should you observe?",
        "What happens when the input changes?",
    ])

    ppt_path = OUTP / f"{number}_{slug}.pptx"
    prs.save(ppt_path)

    # GitHub cannot render .pptx files inline. A matching PDF preview makes every
    # presentation readable directly from the PPTs folder in the GitHub browser.
    preview_path = OUTP / f"{number}_{slug}_Preview.pdf"
    make_preview_pdf(preview_path, title, number, tasks, workflow, runtime, code_chunks)

    # Keep the dedicated runtime PDF folder for users who want only the execution guide.
    runtime_pdf = OUTPDF / f"{number}_{slug}_Runtime.pdf"
    make_preview_pdf(runtime_pdf, title, number, tasks, workflow, runtime, code_chunks)
    return number, title, slug


rows = []
for folder in sorted(ROOT.iterdir()):
    if folder.is_dir() and re.match(r"^\d\d-", folder.name) and (folder / "README.md").exists():
        rows.append(build(folder))

index_lines = [
    "# FSD2 Lab Materials",
    "",
    "Generated presentations, GitHub-readable PDF previews, runtime PDFs and visual workflows.",
    "",
    "> **Important:** GitHub does not display `.pptx` slides directly in the file viewer. Open the matching `*_Preview.pdf` in the `PPTs` folder to read the same presentation directly in GitHub. Download the `.pptx` when you need the editable PowerPoint file.",
    "",
]
for number, title, slug in rows:
    index_lines += [
        f"## {number}. {title}",
        f"- [PowerPoint](PPTs/{number}_{slug}.pptx)",
        f"- [GitHub Preview PDF](PPTs/{number}_{slug}_Preview.pdf)",
        f"- [Runtime PDF](PDFs/{number}_{slug}_Runtime.pdf)",
        f"- [Workflow image](docs/assets/{number}_workflow.png)",
        f"- [Runtime image](docs/assets/{number}_runtime.png)",
        "",
    ]

(ROOT / "MATERIALS_INDEX.md").write_text("\n".join(index_lines), encoding="utf-8")

ppt_readme = """# PPTs — FSD2 Lab Presentations\n\nEach experiment has two presentation files:\n\n- `*.pptx` — editable PowerPoint presentation.\n- `*_Preview.pdf` — the same presentation in a GitHub-readable format. Open this PDF directly in GitHub when you do not want to download the PPT.\n\nThe presentations use a consistent 16:9 layout, larger readable text, short points, clean code blocks, workflow visuals, runtime walkthroughs and viva questions.\n\nFor the complete list, open [`MATERIALS_INDEX.md`](../MATERIALS_INDEX.md).\n"""
(OUTP / "README.md").write_text(ppt_readme, encoding="utf-8")

print(f"Generated clean presentations, GitHub previews and runtime guides for {len(rows)} experiments.")
