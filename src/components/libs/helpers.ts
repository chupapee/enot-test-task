export function formatDate(date: Date): string {
  const today = new Date();
  // calculate is tomorrow
  if (
    date.getFullYear() == today.getFullYear() &&
    date.getMonth() == today.getMonth() &&
    date.getDate() - 1 == today.getDate()
  ) {
    return 'Tomorrow';
  }

  // format to 'dd/mm' view
  const { preDay, preMonth } = {
    preDay: String(date.getDate()),
    preMonth: String(date.getMonth() + 1), // increase due to default starts with 0
  };

  const day = preDay.length < 2 ? `0${preDay}` : preDay;
  const month = preMonth.length < 2 ? `0${preMonth}` : preMonth;

  return `${day}/${month}`;
}
