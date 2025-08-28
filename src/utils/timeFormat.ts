export const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const time = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  if (isToday) {
    return time;
  } else if (isYesterday) {
    return `Hier, ${time}`;
  } else {
    return `${date.toLocaleDateString([], {
      day: '2-digit',
      month: 'short',
    })}, ${time}`;
  }
};

export const formatDate = (created: string) => {
  const date = new Date(created);
  return date.toLocaleDateString();
};
