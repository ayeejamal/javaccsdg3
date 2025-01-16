import React, { useState, useEffect } from 'react';
import { Box, useTheme, Grid, Card, CardContent, Typography, CardActionArea, CardMedia } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { tokens } from "../../../base/theme";
import Header from "../../../components/Header";
import GetData from '../../../data/getData';

const SelectProductToEdit = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await GetData.getAllProducts();
                console.log("Fetched products:", data);
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error("Received non-array data:", data);
                    setProducts([]);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setError(error.message);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleProductSelect = (productId) => {
        if (productId) {
            console.log("Selected product ID:", productId);
            navigate(`/edit-product/${productId}`);
        } else {
            console.error("Product ID is undefined");
        }
    };

    if (loading) {
        return (
            <Box sx={{ textAlign: 'center', padding: '20px' }}>
                <Typography>Loading products...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ textAlign: 'center', padding: '20px', color: 'error.main' }}>
                <Typography>Error loading products: {error}</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Header title="Select Product to Edit" subtitle="Click on a product card to edit its details" />

            <Box marginLeft="1%" marginRight="1%" marginTop="20px">
                <Grid container spacing={3}>
                    {products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id || product._id}>
                            <Card
                                sx={{
                                    backgroundColor: theme.palette.mode === "dark"
                                        ? colors.primary[400]
                                        : colors.primary[100],
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    '&:hover': {
                                        transform: 'scale(1.02)',
                                        transition: 'transform 0.2s ease-in-out',
                                        cursor: 'pointer'
                                    }
                                }}
                            >
                                <CardActionArea
                                    onClick={() => handleProductSelect(product.id || product._id)}
                                    sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                                >
                                    {product.imageStore && (
                                        <CardMedia
                                            component="img"
                                            height="300"
                                            src={`data:image/jpeg;base64,${product.imageStore}`}
                                            alt={product.title}
                                            sx={{
                                                objectFit: 'cover',
                                                width: '100%'
                                            }}
                                        />
                                    )}
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                marginBottom: "10px",
                                                fontWeight: 'bold',
                                                color: theme.palette.mode === "dark"
                                                    ? colors.greenAccent[500]
                                                    : colors.greenAccent[700]
                                            }}
                                        >
                                            {product.title}
                                        </Typography>

                                        <Typography
                                            variant="body1"
                                            sx={{
                                                marginBottom: "5px",
                                                color: product.status === "1"
                                                    ? colors.greenAccent[500]
                                                    : colors.grey[500]
                                            }}
                                        >
                                            Status: {product.status === "1" ? "Published" : "Draft"}
                                        </Typography>

                                        {product.tag && (
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    marginBottom: "5px",
                                                    fontWeight: 'bold',
                                                    color: theme.palette.mode === "dark"
                                                        ? colors.blueAccent[500]
                                                        : colors.blueAccent[700]
                                                }}
                                            >
                                                Price: RM{product.tag}
                                            </Typography>
                                        )}

                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: theme.palette.mode === "dark"
                                                    ? colors.grey[300]
                                                    : colors.grey[700],
                                                marginTop: "10px"
                                            }}
                                        >
                                            {product.postShortDescription}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {products.length === 0 && !loading && !error && (
                    <Box
                        sx={{
                            textAlign: "center",
                            padding: "20px",
                            color: theme.palette.mode === "dark"
                                ? colors.grey[300]
                                : colors.grey[700]
                        }}
                    >
                        <Typography variant="h5">
                            No products found. Please add some products first.
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default SelectProductToEdit;