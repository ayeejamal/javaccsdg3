import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import Header from "../../../components/Header";
import SaveItemsAdmin from '../../saveItemAdmin';

const AddProduct = () => {
  const navigate = useNavigate();
  const [openAiImage, setOpenAiImage] = useState(false);
  const [image, setImage] = useState(null);
  const [postShortDescription, setPostShortDescription] = useState(null);
  const [tag, setTag] = useState(null);
  const [place, setPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [postSlug, setPostSlug] = useState(null);
  const [status, setStatus] = useState(null);
  const [date, setDate] = useState(null);
  const [content, setContent] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const success = await SaveItemsAdmin.addProductAdmin(
        postShortDescription,
        tag,
        title,
        postSlug,
        content,
        status,
        date,
        image,
        place
      );
      if (success) {
        setSnackbar({
          open: true,
          message: 'Product added successfully!',
          severity: 'success'
        });
        // Add a slight delay before navigation to allow the snackbar to be seen
        setTimeout(() => {
          navigate("/services");
        }, 2000);
      } else {
        setSnackbar({
          open: true,
          message: 'Error saving product',
          severity: 'error'
        });
      }
    } catch (error) {
      console.error("Saving Error:", error);
      setSnackbar({
        open: true,
        message: 'An error occurred while saving the product',
        severity: 'error'
      });
    }
  };

  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto', p: 3 }}>
      <Header title="Add Product" subtitle="Please Fill All the Fields" />

      <Dialog open={openAiImage} fullWidth maxWidth="lg">
        <DialogTitle>AI Image Generator or Edit</DialogTitle>
        <DialogContent>
          <Stack spacing={2} margin={2} />
        </DialogContent>
        <DialogActions>
          <Button color="success" variant="contained">Use Image</Button>
          <Button color="error" variant="contained" onClick={() => setOpenAiImage(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: 'repeat(12, 1fr)',
          '& > *': { m: 0 }
        }}
      >
        {/* Row 1 */}
        <TextField
          label="Enter Product Title"
          variant="filled"
          onChange={(e) => setTitle(e.target.value)}
          sx={{ gridColumn: 'span 6' }}
          required
        />

        <FormControl variant="filled" sx={{ gridColumn: 'span 3' }}>
          <FilledInput
            type="date"
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <FormHelperText>Created Date</FormHelperText>
        </FormControl>

        <FormControl variant="filled" sx={{ gridColumn: 'span 3' }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <MenuItem value={0}>Draft</MenuItem>
            <MenuItem value={1}>Publish</MenuItem>
          </Select>
        </FormControl>

        {/* Row 2 - Price Tag and Description side by side */}
        <FormControl variant="filled" sx={{ gridColumn: 'span 4' }}>
          <InputLabel>Price Tag</InputLabel>
          <FilledInput
            onChange={(e) => setTag(e.target.value)}
            required
          />
        </FormControl>

        <FormControl variant="filled" sx={{ gridColumn: 'span 8' }}>
          <InputLabel>Product Short Description</InputLabel>
          <FilledInput
            multiline
            rows={1}
            onChange={(e) => setPostShortDescription(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end">
                  <SmartToyOutlinedIcon />
                </IconButton>
              </InputAdornment>
            }
            required
          />
        </FormControl>

        {/* Row 3 - Image Upload */}
        <FormControl variant="filled" sx={{ gridColumn: 'span 6' }}>
          <Input
            accept="image/*"
            id="image-upload"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
          <FormHelperText>Product Image</FormHelperText>
        </FormControl>

        {/* Row 4 - Save Button */}
        <Box sx={{ gridColumn: 'span 12', display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
          <Button
            type="submit"
            color="success"
            variant="contained"
            size="large"
            sx={{
              width: '200px',
              height: '48px'
            }}
          >
            Save Product
          </Button>
        </Box>
      </Box>

      {/* Snackbar Alert */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddProduct;