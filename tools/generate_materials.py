from pathlib import Path
import re
from PIL import Image, ImageDraw, ImageFont
from pptx import Presentation
from pptx.util import Inches, Pt
from reportlab.pdfgen.canvas import Canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader

ROOT=Path(__file__).resolve().parents[1]
OUTP=ROOT/'PPTs'; OUTPDF=ROOT/'PDFs'; AS=ROOT/'docs/assets'
for p in (OUTP,OUTPDF,AS): p.mkdir(parents=True,exist_ok=True)
# Remove old failed-build bundle helpers before publishing the clean repository.
for p in (ROOT/'BUILD_TRIGGER.txt', ROOT/'tools/fsd2_source_bundle.b64'):
    if p.exists(): p.unlink()
for p in ROOT.joinpath('tools').glob('fsd2_bundle_*.b64'):
    p.unlink()

def text(path): return path.read_text(encoding='utf-8')
def title_tasks(readme):
    lines=text(readme).splitlines(); title='FSD2 Lab Experiment'; tasks=[]
    for line in lines:
        if line.startswith('# '): title=line[2:].strip()
        if line.startswith('- '): tasks.append(line[2:].strip())
    return title,tasks

def font(size=34):
    try:return ImageFont.truetype('DejaVuSans.ttf',size)
    except:return ImageFont.load_default()

def diagram(path,title,mode):
    im=Image.new('RGB',(1280,720),'white'); d=ImageDraw.Draw(im)
    d.text((45,35),title,font=font(38),fill='black')
    boxes=[('1. Input','Browser / terminal'),('2. Process','Code runs here'),('3. Result','Screen / API output')]
    xs=[60,455,850]
    if mode=='workflow':
        boxes=[('Client','Request'),('Framework','Route / component'),('Data','Database / state'),('Output','Response / screen')]; xs=[35,335,650,965]
    for x,(a,b) in zip(xs,boxes):
        d.rounded_rectangle((x,270,x+245,450),18,outline='black',width=3)
        d.text((x+18,305),a,font=font(25),fill='black'); d.text((x+18,355),b,font=font(21),fill='black')
    for i in range(len(xs)-1): d.line((xs[i]+245,360,xs[i+1],360),fill='black',width=5)
    d.text((50,560),'FSD2 learning aid: follow the request/value from left to right.',font=font(22),fill='black')
    im.save(path)

def add_title(slide,title,subtitle=''):
    slide.shapes.title.text=title; slide.shapes.title.text_frame.paragraphs[0].font.size=Pt(28)
    if subtitle:
        sh=slide.placeholders[1]; sh.text=subtitle; sh.text_frame.paragraphs[0].font.size=Pt(18)

def add_bullets(prs,title,items):
    s=prs.slides.add_slide(prs.slide_layouts[1]); add_title(s,title)
    tf=s.placeholders[1].text_frame; tf.clear()
    for i,x in enumerate(items):
        p=tf.paragraphs[0] if i==0 else tf.add_paragraph(); p.text=x; p.font.size=Pt(18); p.space_after=Pt(8)
    return s

def build(folder):
    read=folder/'README.md'; title,tasks=title_tasks(read); n=folder.name[:2]
    slug=re.sub(r'[^A-Za-z0-9]+','_',title).strip('_')
    wf=AS/f'{n}_workflow.png'; rt=AS/f'{n}_runtime.png'; diagram(wf,title,'workflow'); diagram(rt,'Runtime walkthrough — '+title,'runtime')
    prs=Presentation(); prs.slide_width=Inches(13.333); prs.slide_height=Inches(7.5)
    s=prs.slides.add_slide(prs.slide_layouts[0]); add_title(s,title,f'FSD2 Lab • Experiment {n}')
    s=prs.slides.add_slide(prs.slide_layouts[5]); add_title(s,'Syllabus tasks'); s.shapes.add_picture(str(wf),Inches(5.1),Inches(1.4),width=Inches(7.6));
    tb=s.shapes.add_textbox(Inches(.6),Inches(1.5),Inches(4.2),Inches(5.1)).text_frame; tb.clear()
    for i,x in enumerate(tasks): p=tb.paragraphs[0] if i==0 else tb.add_paragraph(); p.text=x; p.font.size=Pt(18); p.space_after=Pt(10)
    s=prs.slides.add_slide(prs.slide_layouts[5]); add_title(s,'How it works'); s.shapes.add_picture(str(wf),Inches(.5),Inches(1.2),width=Inches(12.2))
    code_files=[p for p in folder.rglob('*') if p.suffix in ('.js','.jsx','.ejs','.html')]
    if code_files:
        snippet=text(code_files[0]).splitlines()[:22]
        s=add_bullets(prs,'Code pathway',[f'{p.name}: {line}' for p,line in enumerate(snippet,1)])
    else: add_bullets(prs,'Code pathway',['Open queries.js and execute the commands in order.','Each command changes or reads the database.'])
    s=prs.slides.add_slide(prs.slide_layouts[5]); add_title(s,'Runtime / expected output'); s.shapes.add_picture(str(rt),Inches(.5),Inches(1.3),width=Inches(12.2))
    add_bullets(prs,'Run it',[f'From repository root: see {folder.name}/README.md','Keep the terminal open while testing the browser or API.','For MongoDB, use mongosh or Atlas as described in the README.'])
    add_bullets(prs,'Viva points',['What is the input?','Which line performs the main operation?','What is the output?','What changes if the input is changed?'])
    prs.save(OUTP/f'{n}_{slug}.pptx')
    pdf=OUTPDF/f'{n}_{slug}_Runtime.pdf'; c=Canvas(str(pdf),pagesize=A4); W,H=A4
    c.setFont('Helvetica-Bold',20); c.drawString(42,H-55,title); c.setFont('Helvetica',11); c.drawString(42,H-75,f'Experiment {n} • Runtime walkthrough')
    c.drawImage(ImageReader(str(wf)),42,H-390,width=W-84,height=280,preserveAspectRatio=True,anchor='c')
    y=H-420; c.setFont('Helvetica-Bold',13); c.drawString(42,y,'Syllabus tasks'); y-=20; c.setFont('Helvetica',10)
    for t in tasks: c.drawString(50,y,'• '+t[:110]); y-=16
    c.showPage(); c.setFont('Helvetica-Bold',18); c.drawString(42,H-55,'Runtime: input → processing → output'); c.drawImage(ImageReader(str(rt)),42,H-395,width=W-84,height=300,preserveAspectRatio=True,anchor='c')
    c.setFont('Helvetica-Bold',12); c.drawString(42,H-430,'What to observe'); c.setFont('Helvetica',10); y=H-450
    for t in ['Start the server or Vite app.','Enter sample input / call the route.','Watch the terminal for logs or errors.','Observe the browser/API/database result.']: c.drawString(50,y,'• '+t); y-=16
    c.save()
    return n,title,slug

rows=[]
for folder in sorted(ROOT.iterdir()):
    if folder.is_dir() and re.match(r'^\d\d-',folder.name) and (folder/'README.md').exists(): rows.append(build(folder))
idx=['# FSD2 Lab Materials','', 'Generated one-topic-at-a-time PPTs and runtime PDFs.','']
for n,title,slug in rows:
    idx += [f'## {n}. {title}',f'- [PPT]({"PPTs"}/{n}_{slug}.pptx)',f'- [Runtime PDF]({"PDFs"}/{n}_{slug}_Runtime.pdf)',f'- [Workflow image](docs/assets/{n}_workflow.png)',f'- [Runtime image](docs/assets/{n}_runtime.png)','']
(ROOT/'MATERIALS_INDEX.md').write_text('\n'.join(idx),encoding='utf-8')
print(f'Generated materials for {len(rows)} experiments.')
