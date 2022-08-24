import React from 'react'
import { Container } from 'react-bootstrap'

const Footer = () => {
  return (
    <div>
        <footer className='py-5 my-5 bg-dark '>
            <Container className='px-4 '>
                <p className='posfooter '
                >Copyright &copy; Shon Port 2022</p>
            </Container>
        </footer>
    </div>
  )
}

export default Footer