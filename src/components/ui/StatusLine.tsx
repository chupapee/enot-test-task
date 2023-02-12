export function StatusLine({ color = 'gray' }: { color: string }) {
  return (
    <span
      style={{
        backgroundColor: color,
        borderRadius: '12px',
        height: '45px',
        width: '5px',
      }}
    ></span>
  );
}