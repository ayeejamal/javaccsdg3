import React, { useState, useEffect } from 'react';
import { Box, useTheme, Grid, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { tokens } from "../../../base/theme";
import Header from "../../../components/Header";
import GetData from '../../../data/getData';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { Card, CardContent, Typography as MuiTypography, CardActionArea, CardMedia, IconButton } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Update the theme configuration at the top of your file:

const theme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
          color: '#000000',
          minWidth: '400px', // Make dialog wider
          padding: '16px', // Add some padding
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '24px', // Larger title
          fontWeight: 'bold',
          color: '#000000',
          padding: '16px 24px',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '20px 24px',
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          fontSize: '18px', // Larger content text
          color: '#000000',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '16px', // Larger button text
          padding: '8px 16px',
        },
      },
    },
  },
});

const API_BASE_URL = 'http://localhost:8082';

// ProductCard Component
const ProductCard = ({ product, theme, colors, onDelete, onSelect }) => {
    return (
        <Card
            sx={{
                backgroundColor: theme.palette.mode === "dark" ? colors.primary[400] : colors.primary[100],
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                '&:hover': {
                    transform: 'scale(1.02)',
                    transition: 'transform 0.2s ease-in-out'
                }
            }}
        >
            <CardActionArea
                onClick={() => onSelect(product.id || product._id)}
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    pb: 7
                }}
            >
                {product.imageStore && (
                    <CardMedia
                        component="img"
                        height="200" // Reduced from 300
                        src={`data:image/jpeg;base64,${product.imageStore}`}
                        alt={product.title}
                        sx={{
                            objectFit: 'cover',
                            width: '100%'
                        }}
                    />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                    <MuiTypography
                        variant="h5"
                        sx={{
                            mb: 2,
                            fontWeight: 'bold',
                            color: theme.palette.mode === "dark"
                                ? colors.greenAccent[500]
                                : colors.greenAccent[700]
                        }}
                    >
                        {product.title}
                    </MuiTypography>

                    <MuiTypography
                        variant="body1"
                        sx={{
                            mb: 1,
                            color: product.status === "1"
                                ? colors.greenAccent[500]
                                : colors.grey[500]
                        }}
                    >
                        Status: {product.status === "1" ? "Published" : "Draft"}
                    </MuiTypography>

                    {product.tag && (
                        <MuiTypography
                            variant="body1"
                            sx={{
                                mb: 1,
                                fontWeight: 'bold',
                                color: theme.palette.mode === "dark"
                                    ? colors.blueAccent[500]
                                    : colors.blueAccent[700]
                            }}
                        >
                            Price: RM{product.tag}
                        </MuiTypography>
                    )}

                    <MuiTypography
                        variant="body2"
                        sx={{
                            color: theme.palette.mode === "dark"
                                ? colors.grey[300]
                                : colors.grey[700]
                        }}
                    >
                        {product.postShortDescription}
                    </MuiTypography>
                </CardContent>
            </CardActionArea>

            <IconButton
                aria-label="delete"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(product);
                }}
                sx={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    color: theme.palette.error.main,
                    '&:hover': {
                        backgroundColor: 'transparent',
                        color: theme.palette.error.dark,
                    },
                }}
            >
                <DeleteIcon />
            </IconButton>
        </Card>
    );
};

// Main SelectProduct Component
const SelectProduct = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [statusFilter, setStatusFilter] = useState('all');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await GetData.getAllProducts();
                console.log("Fetched products:", data);
                if (Array.isArray(data)) {
                    setProducts(data);
                    setFilteredProducts(data);
                } else {
                    console.error("Received non-array data:", data);
                    setProducts([]);
                    setFilteredProducts([]);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setError(error.message);
                setProducts([]);
                setFilteredProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        filterProducts(statusFilter);
    }, [statusFilter, products]);

    const filterProducts = (status) => {
        if (status === 'all') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product => product.status === status);
            setFilteredProducts(filtered);
        }
    };

    const handleStatusFilterChange = (event) => {
        setStatusFilter(event.target.value);
    };

    const handleProductSelect = (productId) => {
        if (productId) {
            console.log("Selected product ID:", productId);
            navigate(`/edit-product/${productId}`);
        } else {
            console.error("Product ID is undefined");
        }
    };

    const handleDeleteClick = (product) => {
        setSelectedProduct(product);
        setOpenConfirm(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedProduct) return;

        try {
            const response = await fetch(`${API_BASE_URL}/api/products/${selectedProduct.id || selectedProduct._id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                const updatedProducts = products.filter(p => p.id !== selectedProduct.id && p._id !== selectedProduct._id);
                setProducts(updatedProducts);
                filterProducts(statusFilter);
                setOpenConfirm(false);
                setSelectedProduct(null);
                navigate("/services");
            } else {
                console.error("Failed to delete product:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
        setSelectedProduct(null);
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
            <Header title="Select Product to Edit or Delete" subtitle="Click on a product card to edit its details or click the trash can icon to delete the product entirely" />

            {/* Status Filter */}
            <Box sx={{ marginLeft: "1%", marginRight: "1%", marginTop: "20px", marginBottom: "20px" }}>
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Filter by Status</InputLabel>
                    <Select
                        value={statusFilter}
                        label="Filter by Status"
                        onChange={handleStatusFilterChange}
                    >
                        <MenuItem value="all">All Products</MenuItem>
                        <MenuItem value="1">Published</MenuItem>
                        <MenuItem value="0">Draft</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box marginLeft="1%" marginRight="1%" marginTop="20px">
                <Grid container spacing={3}>
                    {filteredProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id || product._id}>
                            <ProductCard
                                product={product}
                                theme={theme}
                                colors={colors}
                                onDelete={handleDeleteClick}
                                onSelect={handleProductSelect}
                            />
                        </Grid>
                    ))}
                </Grid>

                {filteredProducts.length === 0 && !loading && !error && (
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

            {/* Confirmation Dialog */}
            <ThemeProvider theme={theme}>
                <Dialog
                    open={openConfirm}
                    onClose={handleCloseConfirm}
                    PaperProps={{
                        sx: {
                            borderRadius: '8px', // Optional: softer corners
                        }
                    }}
                >
                    <DialogTitle sx={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#000000'
                    }}>
                        Confirm Delete
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{
                            fontSize: '18px',
                            color: '#000000'
                        }}>
                            Are you sure you want to delete the product "{selectedProduct?.title}"?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ padding: '16px 24px' }}>
                        <Button
                            onClick={handleCloseConfirm}
                            color="secondary"
                            sx={{
                                fontSize: '16px',
                                padding: '8px 16px'
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConfirmDelete}
                            color="error"
                            autoFocus
                            sx={{
                                fontSize: '16px',
                                padding: '8px 16px'
                            }}
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </Box>
    );
};

export default SelectProduct;