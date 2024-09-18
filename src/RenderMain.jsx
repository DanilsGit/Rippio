/* eslint-disable react/prop-types */
// Main.jsx
import React from 'react';
import { RouterProvider } from "react-router-dom";
import { useLocalStorageFix } from '@m/core/hooks/useLocalStorageFix';
import { useUserData } from '@m/core/hooks/useUserData';
import { useCartData } from '@m/core/hooks/useCartData';
import { ApolloProvider } from '@apollo/client';
import { client } from '@m/core/apollo-client';

function RenderMain({ router }) {
    useLocalStorageFix();
    useUserData();
    useCartData();

    return (
        <React.StrictMode>
            <ApolloProvider client={client}>
                <RouterProvider router={router} />
            </ApolloProvider>
        </React.StrictMode>
    );
}

export default RenderMain;