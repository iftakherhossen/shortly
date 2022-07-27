import React, { useRef, useState } from 'react';
import { Flex, Square, Input, InputGroup, InputLeftElement, Grid, Button, GridItem, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogBody, AlertDialogFooter, Heading, useBreakpointValue } from '@chakra-ui/react'
import { LinkIcon } from '@chakra-ui/icons';
import axios from 'axios';


const Home = () => {
     const [url, setUrl] = useState('');
     const [shortenedUrl, setShortenedUrl] = useState('');
     const cancelRef = useRef();
     const { isOpen, onOpen, onClose } = useDisclosure();

     const handleShort = async () => {
          try {
               const response = await axios(
                    `https://api.shrtco.de/v2/shorten?url=${url}`
               );
               setShortenedUrl(response.data.result.full_short_link);
               onOpen();
          }
          catch (e) {
               console.log(e);
          }
     };

     const handleFocus = (event) => event.target.select();

     const handleCopyURL = value => navigator.clipboard.writeText(value);

     const responsive = useBreakpointValue({ base: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' });
     const colSpan = useBreakpointValue({ base: '2', md: '5' });
     const w = useBreakpointValue({ base: '100%', md: '100vw' });
     const ml = useBreakpointValue({ base: '1.5', md: '3' });

     

     return (
          <>
               <Flex>
                    <Square w={w} h='100vh' flexDirection='column'>
                         <Grid> 
                              <GridItem mb='8'>
                                   <Heading style={{ fontFamily: 'Ibarra Real Nova, serif' }}>
                                        Shortly by <a href="https://iftakher-hossen.vercel.app/" target='_blank' rel='noreferrer' style={{ fontWeight: 'bold', color: '#61dafb' }}>Iftakher</a>
                                   </Heading>
                              </GridItem>
                         </Grid>
                         <Grid
                              templateColumns={responsive}                              
                              templateRows={responsive}
                              mb='150'
                         >
                              <GridItem colSpan={colSpan}>
                                   <InputGroup>
                                        <InputLeftElement
                                             pointerEvents='none'
                                             children={<LinkIcon color='gray.300' />}
                                        />
                                        <Input
                                             type='url'
                                             placeholder='URL'
                                             width='100%'
                                             value={url}
                                             onChange={(e) => setUrl(e.target.value)}
                                             autoFocus
                                             focusBorderColor='#61dafb'
                                             style={{ fontFamily: 'Ibarra Real Nova, serif' }}
                                             onFocus={handleFocus}
                                        />
                                   </InputGroup>
                              </GridItem>
                              <GridItem w='100%' ml={ml}>
                                   <Button bg='#61dafb' color='#282c34' onClick={() => handleShort(url)} disabled={url === ''}  style={{ fontFamily: 'Ibarra Real Nova, serif' }}>Short</Button>
                              </GridItem>
                         </Grid>
                    </Square>
               </Flex>

               <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
               >
                    <AlertDialogOverlay>
                         <AlertDialogContent>
                              <AlertDialogFooter mt='5' justifyContent='center'>
                                   <Button bg='#61dafb' color='#282c34' onClick={() => handleCopyURL(shortenedUrl)} style={{ fontFamily: 'Ibarra Real Nova, serif', fontWeight: 700 }}>Copy to Clipboard</Button>
                              </AlertDialogFooter>
                              <AlertDialogBody color='black' mb='2' textAlign='center' style={{ fontFamily: 'Ibarra Real Nova, serif' }}>
                                   Thank you for using Shortly made by <a href="https://iftakher-hossen.vercel.app/" target='_blank' rel='noreferrer' style={{ color: '#282c34', fontWeight: 700 }}>Iftakher Hossen</a>
                              </AlertDialogBody>
                         </AlertDialogContent>
                    </AlertDialogOverlay>
               </AlertDialog>
          </>

     );
};

export default Home;