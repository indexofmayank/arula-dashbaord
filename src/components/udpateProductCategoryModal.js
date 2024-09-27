import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Textarea,
  Center,
  HStack,
  Image,
  VStack,
  Checkbox,
  Text,
  Select,
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useProductCategoryContext } from '../context/productCategory_context';

function UpdateProductCategoryModal({ id }) {

  const {
    single_productCategory: {
      name = '',
      status = '',
      image = ''
    },
    single_productCategory_laoding: singleproductcategoryloading,
    fetchProductCategoryById,
    updateExistingProductCategoryDetail,
    udpateProductCategory,
    fetchAllProductCategory
  } = useProductCategoryContext();

  const [imageList, setImageList] = useState(image);
  const [loading, setLoading] = useState(false);
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImageList(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const toast = useToast();

  const handleRemoveImage = async () => {
    setImageList(null);
  };

  useEffect(() => {
    setImageList(image);
  }, [singleproductcategoryloading]);

  const handleSubmit = async () => {
    if (!name || !status) {
      return toast({
        position: 'top',
        description: 'Provide all the details',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    if(imageList.length < 1) {
      return toast({
        position: 'top',
        description: 'Add atleast one image',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
    setLoading(true);
    const productCategory = {
      name,
      status,
      image: imageList
    };
    const responseCreate = await udpateProductCategory(id, productCategory);
    setLoading(false);
    if(responseCreate.success) {
      onClose();
      toast({
        position: 'top',
        description: 'Product Category updated',
        status: 'success',
        duration: 5000,
        isClosable: true
      });
      await fetchAllProductCategory();
    } else {
      onClose();
      return toast({
        position: 'top',
        description: responseCreate.message,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  }

  return (
    <>
      <Text
        colorScheme='brown'
        minW='100%'
        onClick={() => {
          onOpen();
          fetchProductCategoryById(id);
        }}
      >
        Edit
      </Text>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product Category</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder='Name'
                name='name'
                focusBorderColor='brown.500'
                value={name}
                onChange={updateExistingProductCategoryDetail}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Status</FormLabel>
              <Select
                placeholder='select status'
                name='status'
                focusBorderColor='brown.500'
                value={status}
                onChange={updateExistingProductCategoryDetail}
              >
                <option value='true'>active</option>
                <option value='false'>inative</option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Images</FormLabel>
              <Center
                bg='brown.50'
                minHeight={100}
                my={5}
                borderWidth={3}
                borderColor='brown.200'
                borderStyle='dashed'
                borderRadius='lg'
                {...getRootProps()}
              >
                {isDragActive ? (
                  <p>Drag your files here</p>
                ) : (
                  <p>
                    Drag drop image files here, or click to select files
                    <br />
                    (Only *.jpeg and *.png images will be accepted)
                  </p>
                )}
              </Center>
              <Input {...getInputProps()} />
            </FormControl>
            <FormControl mt={4}>
              <HStack>
                {imageList && (
                  <VStack>
                    <Image
                      src={imageList}
                      boxSize='70px'
                      objectFit='cover'
                      borderRadius='lg'
                    />
                    <Button
                      size='xs'
                      variant='outline'
                      colorScheme='red'
                      onClick={handleRemoveImage}
                    >
                      Remove
                    </Button>
                  </VStack>
                )}
              </HStack>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={loading}
              loadingText='Updating product category'
              colorScheme='brown'
              onClick={handleSubmit}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateProductCategoryModal;