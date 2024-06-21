import React, { useEffect, useState, useRef } from "react";
import { useStyle } from '@magento/venia-ui/lib/classify';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from "react-router-dom";
import defaultClasses from './searchPage.module.css';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';


import { styled } from '@mui/material/styles';
import { Skeleton } from '@mui/material';
import AddToCart from '../AddToCart/addToCart';
import { ErrorOutline } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import SearchIconYellow from '../Icons/SearchIconYellow.svg';
import debounce from 'lodash.debounce';
import ProductLabel from "../ProductLabel/productLabel";
import ProductPrice from "../ProductPrice/productPrice";
import TopSearches from "../TopSearches/topSearches";
import { useQuery } from "@apollo/client";
import { SEARCH_PRODUCTS_QUERY } from "./searchQuery.qql"; // Import the query
import { sendSearchEvent } from '../App/GTMEvents.js';
import { GetDefautlCountryData } from "../GetDefaultCountryData/getDefautlCountryData";

const ErrorContent = ({ errorMessage }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="300px"
    >
      <ErrorOutline sx={{ fontSize: 48, color: 'error.main' }} />
      <Typography variant="h6" component="div" align="center" mt={2}>
        {errorMessage}
      </Typography>
    </Box>
  );
};

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    border: "none", // Remove border
    borderRadius: "9.104px",
    background: "#FFF",
    boxShadow: "0px 0px 12.13901px 0px rgba(0, 0, 0, 0.12)",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none", // Remove notched outline
    },
  },
  "& .MuiOutlinedInput-input.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "none", // Replace with your desired border color
  }
}));

const SearchPage = props => {
  const { formatMessage } = useIntl();
  const classes = useStyle(defaultClasses, props.classes);
  const [isLoading, setIsLoading] = useState(false); // State to track loading state
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isScrolling, setIsScrolling] = useState(false);
  const searchTextFieldRef = useRef(null);

  // useEffect(() => {
  //   // Set focus on the search text field when the component mounts
  //   //searchTextFieldRef.current.focus();
  // }, []);

  // useEffect(() => {
  //     console.log("Page loaded, run once");
  //     setIsScrolling(true);
  // }, []); // Empty dependency array ensures it runs only 

  // const handleTouchScroll = (event) => {
  //     setIsScrolling(true);
  //     // Your touch scroll logic here
  //     console.log('Touch event detected');
  // };

  

  const { loadingCountry, errorCountry, storeConfig } = GetDefautlCountryData();

  const { loading, error, data } = useQuery(SEARCH_PRODUCTS_QUERY, {
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
      variables: {
        searchQuery: debouncedSearchTerm,
        pageSize: 20,
        currentPage: 1,
      },
      skip: debouncedSearchTerm.length < 3, // Skip the query if search term is less than 3 characters
      //onCompleted: () => setIsLoading(false), // Turn off loading when query completes
      onCompleted: () => {
        // Additional code to call on completion
        setIsLoading(false); // Turn off loading when query completes
        // Add your additional code here
        // For example:
        console.log("Query completed!");
        if (data && data?.products?.items?.length > 0) {
          const currentCountry = storeConfig?.beesline_default_country?.default_country_name;
          const gtmSearch = {
              search_term: debouncedSearchTerm,
              country: currentCountry
          };
          console.log("->>> Datalayer -> gtmSearch = ", gtmSearch);
          sendSearchEvent(gtmSearch);
        }
      }
  });

  const debouncedSearch = debounce((term) => {
    setSearchTerm(term);
    setIsLoading(true);
  }, 1000);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    // if (term.length >= 3) {
    //   setIsLoading(true); // Start loading when user enters 3 characters
    // }
  };

  const handleSearchButtonClick = () => {
    if (searchTerm.length >= 3) {
      // Trigger the search when the user has entered at least 3 characters
      setIsLoading(true); // Start loading
      setDebouncedSearchTerm(searchTerm); // Trigger the search with the current searchTerm
    }
  };

  // Debounce the search term when the user stops typing
  useEffect(() => {
    const debouncedSearch = debounce(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Adjust the debounce delay (in milliseconds) as needed
    debouncedSearch();

    // Cleanup the debounce function
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm]);

  let searchContent;

  if (isLoading || loading) {
    searchContent = (
      <Box sx={{ margin: '10px 0' }}>
        <Grid sx={{ flexGrow: 1, padding: '0px' }} container spacing={2}>
          {Array.from({ length: 4 }, (_, index) => (
            <Grid key={index} item xs={6}>
              <Skeleton variant="rounded" width="100%" height={200} />
              <Skeleton height={10} style={{ marginTop: 6 }} />
              <Skeleton height={10} width="60%" />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  } else if (error) {
    searchContent = <ErrorContent errorMessage={error.message} />;
  } else if (data?.products?.items?.length > 0) {
    searchContent = (
      <Box sx={{ margin: '30px 0 0' }}>
        <Grid sx={{ flexGrow: 1, padding: '0px' }} container spacing={2}>
          {data.products.items.map((product) => (
            <Grid key={product.uid} item xs={6}>
              <Box className={classes.imageContainer}>
                <ProductLabel item={product} />
                <Link className={classes.produName} to={`/${product.url_key}.html`}>
                  <img src={product.image.url} alt={product.name} loading="eager" className={classes.image} maxWidth="100%" maxHeight="100%" />
                </Link>
                <AddToCart key={product.uid} product={product} />
              </Box>
              <Typography sx={{ marginBottom: '0px' }} variant="button" display="block" gutterBottom>
                <Link className={classes.produName} to={`/${product.url_key}.html`}>
                  {product.name}
                </Link>
              </Typography>
              <ProductPrice item={product} />
              {/* <Box className={classes.priceContainer}>
                <Typography variant="h6" component="span" className={classes.priceText}>
                  {product.price_range.minimum_price.final_price.currency}{product.price_range.minimum_price.final_price.value}
                </Typography>
              </Box> */}
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  } else if (data?.products?.items?.length == 0) {
    searchContent = <p>We haven't found what you're looking for.</p>;
  } else {
    searchContent = '';
  }

  return (
    <div className={classes.root}>
      <Box className={classes.searchBox}>
        <StyledTextField
          fullWidth
          inputRef={searchTextFieldRef}
          margin="dense"
          id="search"
          label=""
          placeholder={formatMessage({ id: 'placeHolder.search' })}
          value={searchTerm}
          onChange={handleSearch}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearchButtonClick}>
          <img src={SearchIconYellow} />
        </IconButton>
      </Box>
      <TopSearches setSearchTerm={setSearchTerm} />
      {searchContent}
    </div>
  );
};

export default SearchPage;
