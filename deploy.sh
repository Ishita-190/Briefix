#!/bin/bash

# Deploy to Netlify with environment variables
echo "Setting up Netlify environment variables..."

# Deploy the updated code
echo "Deploying to Netlify..."
npx -y @netlify/mcp@latest --site-id 9f9e51da-c7be-486f-a676-1f595fc8c486 --proxy-path "https://netlify-mcp.netlify.app/proxy/eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..svlO-Dm13e6n5bWG.Frk_wBROcMms3fDLPyxldvDM7WaXe6uW22xLJdagpsa-lHK3G42omdknTgMKdM5Q1yrF4D3O0J66EZ5QtCULzvIZl0Nnbw_CCUcIqD4yPCXAzS6WQ_tibqseLN6fk3kgHEKsE2m6KzZ1UlDEMlSt2CM3wsnpZzKU8EhC1MZ648DU9dX_ohaQBD0LeT7Ac2oeHFvQS7L_mhmSyB-K7NWczOl67-W8tuDSnhSyXv4HZl3XxxrakNZH0kE2itdezkE7b2Dwt76bP-CXPkd_tYTGJwjDKWumHKZClYXdImtG8-aevr9Uz5c4seZ_D0rLcJMIQ37_WuYl7Ly5qalDsJice_fm9Dx0gtwxFs_58LD96Q._PGPinQBCgSj3GsN_pEJVw" --no-wait

echo "Deployment started! Check https://app.netlify.com/sites/briefix for progress."
echo "Note: You'll need to add GEMINI_API_KEY environment variable in Netlify dashboard."
