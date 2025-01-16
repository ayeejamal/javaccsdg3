import React, { useState, useEffect } from 'react';
import { Box, useTheme, Button, DialogActions, Dialog, DialogContent, DialogTitle, Stack, FormControl, FormHelperText, InputLabel, Input, Select, MenuItem, TextField, FilledInput, InputAdornment, IconButton } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { tokens } from "../../../base/theme";
import Header from "../../../components/Header";
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';

import GetData from '../../../data/getData';
import SaveItemsAdmin from '../../saveItemAdmin';

const EditProduct = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { id } = useParams(); // Assuming we get product ID from route
    const [product, setProduct] = useState(null);

    const [title, setTitle] = useState("");
    const [postSlug, setPostSlug] = useState("");
    const [postShortDescription, setPostShortDescription] = useState("");
    const [tag, setTag] = useState("");
    const [place, setPlace] = useState("");
    const [dateProduct, setDateProduct] = useState("");
    const [status, setStatus] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        // Load product data on component mount
        const fetchProduct = async () => {
            try {
                const data = await GetData.getProduct(id);
                console.log("Fetched product data:", data); // Debugging line
                setProduct(data);
                // Set other fields based on product data
                setTitle(data.title || "");
                setPostSlug(data.postSlug || "");
                setPostShortDescription(data.postShortDescription || "");
                setTag(data.tag || "");
                setPlace(data.place || "");
                setStatus(data.status || "");
                setDateProduct(data.dateProduct || ""); // Ensuring the date is set properly
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChangeStatus = (event) => setStatus(event.target.value);
    const handleChangePlace = (event) => setPlace(event.target.value);

const handleSaveProduct = async (event) => {
    event.preventDefault();

    try {
        const currentProductData = { ...product }; // Clone the current product data

        // Merge current data with only the updated fields
        const updatedProductData = {
            ...currentProductData,
            ...(title !== product.title && { title }),
            ...(dateProduct !== product.dateProduct && { dateProduct }),
            ...(postSlug !== product.postSlug && { postSlug }),
            ...(postShortDescription !== product.postShortDescription && { postShortDescription }),
            ...(tag !== product.tag && { tag }),
            ...(place !== product.place && { place }),
            ...(status !== product.status && { status }),
        };

        console.log('Merged data:', updatedProductData);

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
        return <Box>Loading...</Box>;
    }

    return (
        <Box>
            <Header title="Edit Product" subtitle="Update the Fields Below" />
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }} component="form" noValidate onSubmit={handleSaveProduct}>
                <TextField
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    label="Product Title"
                    id="title"
                    sx={{ m: 1, width: '30.5%' }}
                    variant="filled"
                />
                <TextField
                    value={postSlug}
                    onChange={(e) => setPostSlug(e.target.value)}
                    label="Product Slug"
                    id="slug"
                    sx={{ m: 1, width: '30.5%' }}
                    variant="filled"
                />
                <FormControl sx={{ m: 1, width: '30.5%' }} variant="filled">
                    <FilledInput
                        value={dateProduct}
                        onChange={(e) => setDateProduct(e.target.value)}
                        id="date"
                        type="date"
                    />
                    <FormHelperText>Publish Date</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1, width: '15.5%' }} variant="filled">
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={status}
                        onChange={handleChangeStatus}
                    >
                        <MenuItem value="0">Draft</MenuItem>
                        <MenuItem value="1">Publish</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: '15.5%' }} variant="filled">
                    <InputLabel>Product Place</InputLabel>
                    <Select
                        value={place}
                        onChange={handleChangePlace}
                    >
                        {Array.from({ length: 12 }, (_, index) => (
                            <MenuItem key={index + 1} value={index + 1}>
                                {index + 1}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, width: '60%' }} variant="filled">
                    <InputLabel>Tags</InputLabel>
                    <FilledInput
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '93%' }} variant="filled">
                    <InputLabel>Short Description</InputLabel>
                    <FilledInput
                        value={postShortDescription}
                        onChange={(e) => setPostShortDescription(e.target.value)}
                        multiline
                        rows={3}
                    />
                </FormControl>
                <Button
                    sx={{ m: 1, width: '46%' }}
                    color="success"
                    variant="contained"
                    type="submit"
                >
                    Save Changes
                </Button>
                <Button
                    sx={{ m: 1, width: '46%' }}
                    color="error"
                    variant="contained"
                    onClick={() => navigate("/products")}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

export default EditProduct;
