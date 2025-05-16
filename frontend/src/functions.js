export const formatDate = (date) => {
    const formattedDate = new Date(date);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Intl.DateTimeFormat('en-US', options).format(formattedDate);
}