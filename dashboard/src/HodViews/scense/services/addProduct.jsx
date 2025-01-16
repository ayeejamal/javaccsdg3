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
        navigate("/services");
      } else {
        alert("Error Saving data");
      }
    } catch (error) {
      console.error("Saving Error:", error);
      alert("An error occurred while saving.");
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
          gap: 2,
          gridTemplateColumns: 'repeat(12, 1fr)',
          '& > *': { m: 0 }
        }}
      >
        {/* Title - spans 4 columns */}
        <TextField
          label="Enter Product Title"
          variant="filled"
          onChange={(e) => setTitle(e.target.value)}
          sx={{ gridColumn: 'span 4' }}
          required
        />

        {/* Slug - spans 4 columns */}
        <TextField
          label="Enter Product Slug"
          variant="filled"
          onChange={(e) => setPostSlug(e.target.value)}
          sx={{ gridColumn: 'span 4' }}
          required
        />

        {/* Date - spans 4 columns */}
        <FormControl variant="filled" sx={{ gridColumn: 'span 4' }}>
          <FilledInput
            type="date"
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <FormHelperText>Publish Date</FormHelperText>
        </FormControl>

        {/* Status - spans 3 columns */}
        <FormControl variant="filled" sx={{ gridColumn: 'span 3' }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={status || ''}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <MenuItem value={0}>Draft</MenuItem>
            <MenuItem value={1}>Publish</MenuItem>
          </Select>
        </FormControl>

        {/* Place - spans 3 columns */}
        <FormControl variant="filled" sx={{ gridColumn: 'span 3' }}>
          <InputLabel>Product Place</InputLabel>
          <Select
            value={place || ''}
            onChange={(e) => setPlace(e.target.value)}
            required
          >
            {[...Array(12)].map((_, i) => (
              <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Price Tag - spans 6 columns */}
        <FormControl variant="filled" sx={{ gridColumn: 'span 6' }}>
          <InputLabel>Price Tag</InputLabel>
          <FilledInput
            onChange={(e) => setTag(e.target.value)}
            required
          />
        </FormControl>

        {/* Short Description - spans full width */}
        <FormControl variant="filled" sx={{ gridColumn: 'span 12' }}>
          <InputLabel>Product Short Description</InputLabel>
          <FilledInput
            multiline
            rows={3}
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

        {/* Image Upload - spans 6 columns */}
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

        {/* Save Button - spans 6 columns */}
        <Button
          type="submit"
          color="success"
          variant="contained"
          size="large"
          sx={{
            gridColumn: 'span 6',
            height: '48px'
          }}
        >
          Save Product
        </Button>
      </Box>
    </Box>
  );
};

export default AddProduct;