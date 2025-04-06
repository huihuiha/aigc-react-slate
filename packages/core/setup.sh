#!/bin/bash
# Setup script for installing dependencies and setting up Rollup build

echo "Setting up the project..."

# Clean existing dependencies
echo "Removing old dependencies..."
rm -rf node_modules
rm -f package-lock.json

# Install dependencies
echo "Installing dependencies..."
npm install

# Make sure the Rollup plugins are installed correctly
echo "Making sure Rollup plugins are installed..."
npm install @rollup/plugin-node-resolve@15.2.3 @rollup/plugin-commonjs@25.0.7 @rollup/plugin-typescript@11.1.5 @rollup/plugin-url@8.0.2 @rollup/plugin-alias@5.1.0 rollup-plugin-dts@6.1.0 rollup-plugin-peer-deps-external@2.2.4 rollup-plugin-postcss@4.0.2 --save-dev

# Clean and build
echo "Cleaning old build files..."
npm run clean

echo "Building the project..."
npm run build

echo "Setup complete! You can now run 'npm run dev' to start the development server." 