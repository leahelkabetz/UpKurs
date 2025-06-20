import React from 'react';
import { Button as MuiButton, ButtonProps, Card as MuiCard, CardContent as MuiCardContent, CardProps, CardContentProps, TextField, TextFieldProps } from '@mui/material';

export const Button: React.FC<ButtonProps> = (props) => {
  return <MuiButton variant="contained" color="primary" {...props} />;
};

export const Card: React.FC<CardProps> = (props) => {
  return <MuiCard elevation={3} {...props} />;
};

export const CardContent: React.FC<CardContentProps> = (props) => {
  return <MuiCardContent {...props} />;
};

export const Input: React.FC<TextFieldProps> = (props) => {
  return <TextField variant="outlined" fullWidth {...props} />;
};