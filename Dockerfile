#  Create a new image from the base nodejs 7 image.
FROM node
# Create the target directory in the imahge
RUN mkdir -p /usr/src/app
# Set the created directory as the working directory
WORKDIR /usr/src/app
# Copy the package.json inside the working directory
COPY package.json /usr/src/app
# Install required dependencies
RUN npm install
# Copy the client application source files. You can use .dockerignore to exlcude files. Works just as .gitignore does.
COPY . /usr/src/app
# Start the application. This is the same as running ng serve.
CMD ["npm", "start"]
