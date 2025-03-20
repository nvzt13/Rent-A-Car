import { useState, useCallback } from 'react';

export const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const showSnackbar = useCallback((newMessage) => {
    setMessage(newMessage);
    setOpen(true);
  }, []);

  const hideSnackbar = useCallback(() => {
    setOpen(false);
  }, []);

  return {
    openSnackbar: open,
    snackbarMessage: message,
    showSnackbar,
    hideSnackbar,
  };
};