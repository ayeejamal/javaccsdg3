import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import Header from "../../../components/Header";
import GetData from '../../../data/getData';
import SaveItemsAdmin from '../../saveItemAdmin';

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [title, setTitle] = useState("");
  const [postShortDescription, setPostShortDescription] = useState("");
  const [tag, setTag] = useState("");
  const [dateProduct, setDateProduct] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await GetData.getProduct(id);
        setProduct(data);
        setTitle(data.title || "");
        setPostShortDescription(data.postShortDescription || "");
        setTag(data.tag || "");
        setStatus(data.status || "");
        setDateProduct(data.dateProduct || "");
        setImage(data.image || "");
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSaveProduct = async (event) => {
    event.preventDefault();
    try {
      const currentProductData = { ...product };
      const updatedProductData = {
        ...currentProductData,
        ...(title !== product.title && { title }),
        ...(dateProduct !== product.dateProduct && { dateProduct }),
        ...(postShortDescription !== product.postShortDescription && { postShortDescription }),
        ...(tag !== product.tag && { tag }),
        ...(status !== product.status && { status }),
      };

    let imageUploadSuccess = true;

    // Handle image upload separately if updated
    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      // Call a separate image upload endpoint
      imageUploadSuccess = await SaveItemsAdmin.uploadProductImage(id, formData);
    }

    if (!imageUploadSuccess) {
      alert("Error uploading the image.");
      return;
    }

      const success = await SaveItemsAdmin.updateProductAdmin(id, updatedProductData);
      if (success) {
        navigate("/services");
      } else {
        alert("Error updating product.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("An error occurred while saving.");
    }
  };

  if (!product) {
    return <Box sx={{ p: 3 }}>Loading...</Box>;
  }

  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto', p: 3 }}>
      <Header title="Edit Product" subtitle="Update the Fields Below" />

      <Box
        component="form"
        onSubmit={handleSaveProduct}
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: 'repeat(12, 1fr)',
          '& > *': { m: 0 }
        }}
      >
        {/* Row 1 */}
        <TextField
          label="Product Title"
          variant="filled"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ gridColumn: 'span 6' }}
          required
        />

        <FormControl variant="filled" sx={{ gridColumn: 'span 3' }}>
          <FilledInput
            type="date"
            value={dateProduct}
            onChange={(e) => setDateProduct(e.target.value)}
            required
          />
          <FormHelperText>Created Date</FormHelperText>
        </FormControl>

        <FormControl variant="filled" sx={{ gridColumn: 'span 3' }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={status || ''}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <MenuItem value="0">Draft</MenuItem>
            <MenuItem value="1">Publish</MenuItem>
          </Select>
        </FormControl>

        {/* Row 2 */}
        <FormControl variant="filled" sx={{ gridColumn: 'span 4' }}>
          <InputLabel>Price Tag</InputLabel>
          <FilledInput
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            required
          />
        </FormControl>

        <FormControl variant="filled" sx={{ gridColumn: 'span 8' }}>
          <InputLabel>Short Description</InputLabel>
          <FilledInput
            value={postShortDescription}
            onChange={(e) => setPostShortDescription(e.target.value)}
            multiline
            rows={1}
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
          />
          <FormHelperText>Update Product Image (Optional)</FormHelperText>
        </FormControl>

        {/* Row 4 - Buttons */}
        <Box sx={{ gridColumn: 'span 12', display: 'flex', gap: 2, mt: 2 }}>
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
            Save Changes
          </Button>
          <Button
            color="error"
            variant="contained"
            size="large"
            onClick={() => navigate("/products")}
            sx={{
              width: '200px',
              height: '48px'
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProduct;