import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateCV() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4
  const { width, height } = page.getSize();

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const primaryColor = rgb(0.08, 0.12, 0.22);
  const textColor = rgb(0.18, 0.2, 0.24);
  const subTextColor = rgb(0.38, 0.42, 0.48);
  const ruleColor = rgb(0.78, 0.82, 0.88);
  const linkColor = rgb(0.15, 0.35, 0.75);

  const margin = 38;
  const contentWidth = width - margin * 2;
  let y = height - 36;

  function drawText(
    text: string,
    x: number,
    currentY: number,
    options: {
      font?: any;
      size?: number;
      color?: any;
    } = {}
  ) {
    page.drawText(text, {
      x,
      y: currentY,
      font: options.font || fontRegular,
      size: options.size || 8.8,
      color: options.color || textColor,
    });
  }

  function wrapText(text: string, maxW: number, font: any, size: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = font.widthOfTextAtSize(testLine, size);
      if (testWidth <= maxW) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  function drawWrappedText(
    text: string,
    x: number,
    startY: number,
    maxW: number,
    options: {
      font?: any;
      size?: number;
      color?: any;
      lineHeight?: number;
    } = {}
  ): number {
    const font = options.font || fontRegular;
    const size = options.size || 8.8;
    const lineHeight = options.lineHeight || 11.5;
    const lines = wrapText(text, maxW, font, size);

    let curY = startY;
    for (const line of lines) {
      drawText(line, x, curY, { font, size, color: options.color || textColor });
      curY -= lineHeight;
    }
    return curY;
  }

  function drawSectionHeader(title: string, currentY: number): number {
    currentY -= 7;
    drawText(title, margin, currentY, { font: fontBold, size: 9.8, color: primaryColor });
    currentY -= 4;
    page.drawLine({
      start: { x: margin, y: currentY },
      end: { x: width - margin, y: currentY },
      thickness: 0.75,
      color: ruleColor,
    });
    return currentY - 8.5;
  }

  function drawBullet(
    text: string,
    startY: number,
    bulletIndent = 8,
    textIndent = 18,
    size = 8.4,
    lineHeight = 11.2
  ): number {
    drawText('•', margin + bulletIndent, startY, { font: fontBold, size: size, color: textColor });
    const availWidth = contentWidth - textIndent;
    return drawWrappedText(text, margin + textIndent, startY, availWidth, {
      font: fontRegular,
      size,
      lineHeight,
      color: textColor,
    });
  }

  // NAME & CONTACT
  drawText('PRATIK CHOUGULE', margin, y, { font: fontBold, size: 14.5, color: primaryColor });
  y -= 13;

  const contactText1 = 'Limerick, Ireland | ';
  const contactText2 = 'pratikchougulex@gmail.com';
  const contactText3 = ' | 089 946 2795 | ';
  const contactText4 = 'https://linkedin.com/in/pratikchougule10';

  let contactX = margin;
  drawText(contactText1, contactX, y, { font: fontRegular, size: 8.5, color: subTextColor });
  contactX += fontRegular.widthOfTextAtSize(contactText1, 8.5);

  drawText(contactText2, contactX, y, { font: fontRegular, size: 8.5, color: linkColor });
  contactX += fontRegular.widthOfTextAtSize(contactText2, 8.5);

  drawText(contactText3, contactX, y, { font: fontRegular, size: 8.5, color: subTextColor });
  contactX += fontRegular.widthOfTextAtSize(contactText3, 8.5);

  drawText(contactText4, contactX, y, { font: fontRegular, size: 8.5, color: linkColor });
  y -= 4;

  // PROFESSIONAL SUMMARY
  y = drawSectionHeader('PROFESSIONAL SUMMARY', y);
  const summary =
    'Analytically driven finance professional pursuing an MSc in Finance (Investment and Asset Management) at UCC, with a Computer Engineering foundation supporting strong technical fluency with large data volumes, dashboards, and reporting tools. Skilled in building KPIs and management metrics, financial modelling, and cost/ratio analysis, translating complex financial information into clear, decision-ready reporting for stakeholders. Comfortable in fast-paced, cross-functional environments, with strong communication skills and a track record of accurate, well-documented analysis under deadline pressure.';
  y = drawWrappedText(summary, margin, y, contentWidth, { font: fontRegular, size: 8.4, lineHeight: 11.2 });
  y += 1;

  // EXPERIENCE
  y = drawSectionHeader('EXPERIENCE', y);
  drawText('Citi - Investment Banking Virtual Experience Program (Forage)', margin, y, { font: fontBold, size: 8.8, color: primaryColor });
  const citiDate = 'Apr 2026';
  const citiDateW = fontRegular.widthOfTextAtSize(citiDate, 8.5);
  drawText(citiDate, width - margin - citiDateW, y, { font: fontRegular, size: 8.5, color: subTextColor });
  y -= 10.5;

  drawText('Self-directed, skills-based simulation program covering investment banking analysis', margin, y, { font: fontOblique, size: 8.2, color: subTextColor });
  y -= 11;

  y = drawBullet(
    'Given a financial dataset with unexplained cost and reporting discrepancies, investigated root causes using structured analysis, enabling data-driven decision making with zero unresolved variances at handoff.',
    y, 6, 16, 8.3, 11
  );
  y = drawBullet(
    'Tasked with assessing intrinsic value for target companies, performed comparable company analysis and DCF valuation, delivering clear, stakeholder-ready investment recommendations.',
    y, 6, 16, 8.3, 11
  );
  y = drawBullet(
    'Facing a deadline-driven reporting cycle across multiple stakeholders, prepared and reconciled financial reports for accuracy mirroring quarter-end close and forecasting discipline and delivered all reports on schedule.',
    y, 6, 16, 8.3, 11
  );
  y += 1;

  // RELEVANT PROJECTS
  y = drawSectionHeader('RELEVANT PROJECTS', y);
  drawText('Equity Investment Analysis and Financial Statement Evaluation', margin, y, { font: fontBold, size: 8.8, color: primaryColor });
  const p1Date = 'Feb 2026';
  const p1DateW = fontRegular.widthOfTextAtSize(p1Date, 8.5);
  drawText(p1Date, width - margin - p1DateW, y, { font: fontRegular, size: 8.5, color: subTextColor });
  y -= 11;

  y = drawBullet(
    'Tasked with benchmarking sector performance, analysed financial data across 6 publicly listed companies over a 5-year horizon to surface key cost and profitability drivers.',
    y, 6, 16, 8.3, 11
  );
  y = drawBullet(
    'To assess company financial health, computed and interpreted 20+ financial ratios (ROE, current ratio, debt-to-equity, asset turnover), producing a clear profitability, liquidity, and efficiency assessment that informed cost and margin analysis.',
    y, 6, 16, 8.3, 11
  );
  y = drawBullet(
    'Needing to organise large volumes of company data, built Excel valuation models and used SQL and Python (Pandas, Matplotlib) to curate data visualisation dashboards, turning raw data into clear, actionable outputs.',
    y, 6, 16, 8.3, 11
  );
  y = drawBullet(
    'Set the goal of identifying the optimal equity allocation, delivered a EUR 10,000 investment recommendation projecting an 11.2% compound annual return over five years.',
    y, 6, 16, 8.3, 11
  );
  y -= 1;

  drawText('Portfolio Optimisation and Alternative Investments Analysis', margin, y, { font: fontBold, size: 8.8, color: primaryColor });
  const p2Date = 'Nov 2025';
  const p2DateW = fontRegular.widthOfTextAtSize(p2Date, 8.5);
  drawText(p2Date, width - margin - p2DateW, y, { font: fontRegular, size: 8.5, color: subTextColor });
  y -= 11;

  y = drawBullet(
    'Given 36 months of historical return data across 5 asset classes, analysed risk-return trade-offs to surface cost optimisation opportunities within the portfolio.',
    y, 6, 16, 8.3, 11
  );
  y = drawBullet(
    'Aiming to reduce portfolio risk, conducted regression analysis to estimate market exposure and derive performance factors, achieving 12% lower volatility and an 18% Sharpe ratio improvement through data-driven allocation.',
    y, 6, 16, 8.3, 11
  );
  y += 1;

  // EDUCATION
  y = drawSectionHeader('EDUCATION', y);
  drawText('University College Cork', margin, y, { font: fontBold, size: 8.8, color: primaryColor });
  const edu1Date = 'Sep 2025 – Present';
  const edu1DateW = fontRegular.widthOfTextAtSize(edu1Date, 8.5);
  drawText(edu1Date, width - margin - edu1DateW, y, { font: fontRegular, size: 8.5, color: subTextColor });
  y -= 10.5;

  drawText('Master of Science in Finance (Investment and Asset Management)', margin, y, { font: fontOblique, size: 8.4, color: textColor });
  y -= 11;

  y = drawBullet(
    'Coursework: Financial Reporting, Corporate Finance, Financial Statement Analysis, Risk Management, Investment Analysis, Statistics, Business Analytics, Financial Modelling.',
    y, 6, 16, 8.3, 11
  );
  y -= 2;

  drawText('Savitribai Phule Pune University', margin, y, { font: fontBold, size: 8.8, color: primaryColor });
  const edu2Date = 'Sep 2020 – Apr 2024';
  const edu2DateW = fontRegular.widthOfTextAtSize(edu2Date, 8.5);
  drawText(edu2Date, width - margin - edu2DateW, y, { font: fontRegular, size: 8.5, color: subTextColor });
  y -= 10.5;

  drawText('Bachelor of Engineering in Computer Engineering', margin, y, { font: fontRegular, size: 8.4, color: textColor });
  y -= 2;

  // SKILLS
  y = drawSectionHeader('SKILLS', y);

  function drawSkillRow(label: string, content: string, startY: number): number {
    const labelW = fontBold.widthOfTextAtSize(label, 8.3);
    drawText(label, margin, startY, { font: fontBold, size: 8.3, color: textColor });
    
    const remainingW = contentWidth - labelW - 4;
    const words = content.split(' ');
    let firstLine = '';
    let restWords: string[] = [];

    for (let i = 0; i < words.length; i++) {
      const test = firstLine ? `${firstLine} ${words[i]}` : words[i];
      if (fontRegular.widthOfTextAtSize(test, 8.3) <= remainingW) {
        firstLine = test;
      } else {
        restWords = words.slice(i);
        break;
      }
    }

    drawText(firstLine, margin + labelW + 4, startY, { font: fontRegular, size: 8.3, color: textColor });
    let curY = startY - 11;

    if (restWords.length > 0) {
      const restText = restWords.join(' ');
      curY = drawWrappedText(restText, margin, curY, contentWidth, { font: fontRegular, size: 8.3, lineHeight: 11 });
    }
    return curY;
  }

  y = drawSkillRow('Finance & Analysis: ', 'KPI & Management Metrics Reporting, Cost & Ratio Analysis, Financial Modelling & Forecasting, Financial Statement Analysis, Complex Financial Information Analysis, Quarter-End Close Support.', y);
  y = drawSkillRow('Data & Tools: ', 'Advanced Excel, SQL, Python (Pandas, Matplotlib, Seaborn), Power BI, Data Visualisation Dashboards, Bloomberg Terminal.', y);
  y = drawSkillRow('Core Strengths: ', 'Analytical & Problem Solving, Business Partnering & Stakeholder Communication, Attention to Detail, Adaptability in Fast-Paced Environments, Cross-Functional Collaboration.', y);
  y += 1;

  // CERTIFICATIONS
  y = drawSectionHeader('CERTIFICATIONS', y);
  y = drawBullet('Financial Analysis and Modelling Professional Certificate - Corporate Finance Institute (CFI)', y, 6, 16, 8.3, 10.8);
  y = drawBullet('Data Visualization Using Python - IBM', y, 6, 16, 8.3, 10.8);

  const pdfBytes = await pdfDoc.save();
  
  fs.mkdirSync(path.join(process.cwd(), 'public'), { recursive: true });
  fs.mkdirSync(path.join(process.cwd(), 'dist'), { recursive: true });

  fs.writeFileSync(path.join(process.cwd(), 'public', 'Pratik_Chougule_CV.pdf'), pdfBytes);
  fs.writeFileSync(path.join(process.cwd(), 'dist', 'Pratik_Chougule_CV.pdf'), pdfBytes);

  console.log('CV PDF generated successfully.');
}

generateCV().catch(err => {
  console.error('Error generating CV:', err);
  process.exit(1);
});
