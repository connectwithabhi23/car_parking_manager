import Home from "../pages/Home";
import {render,screen, fireEvent, waitFor} from '@testing-library/react'
import React from "react";
import { BrowserRouter } from "react-router-dom";


const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));




const setLots = jest.fn()

describe('Home', ()=>{

    test('Home component should render correctly', () => { 

        render(<BrowserRouter><Home setLots={setLots}></Home> </BrowserRouter>)

        const headingElement = screen.getByText('Car Parking App');
        expect(headingElement).toBeInTheDocument();

        const inputElement = screen.getByPlaceholderText('Enter the number of lots')
        expect(inputElement).toBeInTheDocument();

        const buttonElement = screen.getByRole('button', {name : 'Create Lots'})
        expect(buttonElement).toBeInTheDocument();
        
     })

     test('should alert when non-numeric value is provided',async()=>{
        const alertMock = jest.spyOn(window, 'alert').mockImplementation()
        render(<BrowserRouter><Home setLots={setLots}></Home> </BrowserRouter>);
        const inputElement = screen.getByPlaceholderText('Enter the number of lots')
        fireEvent.change(inputElement,{target: {value : 'r'}})
        expect(alertMock).toHaveBeenCalledTimes(1);
        
      })

      test('inputElement and state have the value that user enters', ()=>{
        render(<BrowserRouter><Home/></BrowserRouter>);
    
        const inputElement = screen.getByPlaceholderText('Enter the number of lots')
        fireEvent.change(inputElement,{target: {value :'5'}})
        expect(inputElement.value).toBe('5')
    
      })

      test('navigate to parking lot page on clicking', ()=>{
        const setLots = jest.fn()
        render(<BrowserRouter><Home setLots={setLots}></Home> </BrowserRouter>)
        const createLotButton = screen.getByRole('button',{name :'Create Lots'})
        fireEvent.click(createLotButton)
        expect(mockedUseNavigate).toHaveBeenCalledTimes(1)
      })
      
})

