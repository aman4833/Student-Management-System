export const GENDERS = ['MALE', 'FEMALE', 'OTHER'];
export const STATUSES = ['ACTIVE', 'INACTIVE', 'GRADUATED', 'SUSPENDED'];

export const EMPTY_STUDENT = {
  scholarNo: '',
  studentName: '',
  email: '',
  contactNo: '',
  address: '',
  courseName: '',
  department: '',
  currentSemester: '',
  sgpa: '',
  collegeName: '',
  passingYear: '',
  gender: 'MALE',
  dateOfBirth: '',
  status: 'ACTIVE',
};

export function studentToFormValues(student) {
  if (!student) return { ...EMPTY_STUDENT };
  return {
    scholarNo: student.scholarNo ?? '',
    studentName: student.studentName ?? '',
    email: student.email ?? '',
    contactNo: student.contactNo ?? '',
    address: student.address ?? '',
    courseName: student.courseName ?? '',
    department: student.department ?? '',
    currentSemester: student.currentSemester != null ? String(student.currentSemester) : '',
    sgpa: student.sgpa != null ? String(student.sgpa) : '',
    collegeName: student.collegeName ?? '',
    passingYear: student.passingYear != null ? String(student.passingYear) : '',
    gender: student.gender ?? 'MALE',
    dateOfBirth: student.dateOfBirth ?? '',
    status: student.status ?? 'ACTIVE',
  };
}

export function formValuesToPayload(values) {
  return {
    scholarNo: values.scholarNo.trim(),
    studentName: values.studentName.trim(),
    email: values.email.trim(),
    contactNo: values.contactNo.trim(),
    address: values.address.trim(),
    courseName: values.courseName.trim(),
    department: values.department.trim(),
    currentSemester: Number(values.currentSemester),
    sgpa: Number(values.sgpa),
    collegeName: values.collegeName.trim(),
    passingYear: Number(values.passingYear),
    gender: values.gender,
    dateOfBirth: values.dateOfBirth,
    status: values.status,
  };
}

export function displayName(student) {
  return student?.studentName ?? student?.name ?? 'Student';
}
