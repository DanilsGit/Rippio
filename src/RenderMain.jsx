/* eslint-disable react/prop-types */
// Main.jsx
import { ApolloProvider } from '@apollo/client';
import { client } from '@m/core/apollo-client';
/* eslint-disable react/prop-types */
// Main.jsx
import React from 'react';
import { RouterProvider } from "react-router-dom";
import { useStart } from './modules/core/hooks/custom-hooks';



function RenderMain({ router }) {
    useStart();

    return (
        <React.StrictMode>
            <ApolloProvider client={client}>
                <RouterProvider router={router} />
            </ApolloProvider>
        </React.StrictMode>
    );
}

export default RenderMain;