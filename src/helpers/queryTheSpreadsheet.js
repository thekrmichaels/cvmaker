import ExcelJS from "exceljs";

export default async function queryTheSpreadsheet(file) {
  const workbook = new ExcelJS.Workbook();
  const buffer = await file.arrayBuffer();

  try {
    await workbook.xlsx.load(buffer);

    const fullName = getFullName(workbook);
    const contacts = getContacts(workbook);
    const experiences = getExperiences(workbook);
    const role = getRole(workbook);

    return { fullName, contacts, experiences, role };
  } catch (error) {
    console.error(
      `Error querying the spreadsheet:\n${error.name}: ${error.message}`,
    );
    throw error;
  }
}

function getFullName(workbook) {
  const sheet = workbook.getWorksheet("Personal Information");
  const firstname = sheet.getCell("B3").value || null;
  const lastname = sheet.getCell("C3").value || null;

  return [firstname, lastname].filter(Boolean).join(" ").trim();
}

function getContacts(workbook) {
  const sheet = workbook.getWorksheet("Personal Information");
  const contacts = [];

  sheet.getColumn("B").eachCell((cell, rowNumber) => {
    if (rowNumber >= 6 && cell.value?.toString().toUpperCase() === "TRUE") {
      const contact = sheet.getCell(`C${rowNumber}`).value;

      contact && contacts.push(contact);
    }
  });

  return contacts;
}

function getExperiences(workbook) {
  const sheet = workbook.getWorksheet("Experience");
  const experiences = [];

  sheet.getColumn("B").eachCell((cell, rowNumber) => {
    if (rowNumber >= 3 && cell.value?.toString().toUpperCase() === "TRUE") {
      experiences.push({
        title: sheet.getCell(`C${rowNumber}`).value || null,
        organization: sheet.getCell(`D${rowNumber}`).value || null,
        location: sheet.getCell(`E${rowNumber}`).value || null,
        startDate: formatDate(sheet.getCell(`F${rowNumber}`).value),
        endDate: formatDate(sheet.getCell(`G${rowNumber}`).value),
        description: sheet.getCell(`H${rowNumber}`).value || null,
      });
    }
  });

  return experiences;
}

function getRole(workbook) {
  const sheet = workbook.getWorksheet("Personal Information");

  return sheet.getCell("E3").value || null;
}

function formatDate(date) {
  if (!date) return null;
  if (date instanceof Date)
    return `${date.getMonth() + 1}/${date.getFullYear()}`;

  return date.toString();
}
