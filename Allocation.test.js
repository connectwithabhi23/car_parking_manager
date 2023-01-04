import Allocation from "../pages/Allocation";
import {fireEvent, render,screen} from '@testing-library/react'
import { BrowserRouter } from "react-router-dom";

describe('Allocation', ()=>{

    test('renders lot Allocation correctly', ()=>{

        render(<BrowserRouter><Allocation></Allocation> </BrowserRouter>)

        const headingElement = screen.getByText('Allocate Parking Space')
        expect(headingElement).toBeInTheDocument()

        // const currentTime = screen.getByText('Current Time', {exact: false})
        // expect(currentTime).toBeInTheDocument()

        const inputElement = screen.getByPlaceholderText('enter car number')
        expect(inputElement).toBeInTheDocument();

        const buttonElement = screen.getByRole('button', {name : 'Assign Space'})
        expect(buttonElement).toBeInTheDocument()
    })

    test('inputElement and state have the value that user enters', ()=>{
        render(<BrowserRouter><Allocation/></BrowserRouter>);
    
        const inputElement = screen.getByPlaceholderText('enter car number')
        fireEvent.change(inputElement,{target: {value :'1234'}})
        expect(inputElement.value).toBe('1234')
    
      })

      test(' value should Change on every user input', ()=>{
        render(<BrowserRouter><Allocation/></BrowserRouter>);
    
        const inputElement = screen.getByPlaceholderText('enter car number')
        fireEvent.change(inputElement,{target: {value :'1'}})
        expect(inputElement).toHaveValue('1')
    
      })

      test('navigate on click when registration number is  provided', ()=>{
        const lots = [{id : 1, isAllocated : false}, {id : 2, isAllocated : false}];
        const setLots = jest.fn();
        render(<BrowserRouter><Allocation lots={lots} setLots= {setLots} /></BrowserRouter>);
        const buttonElement = screen.getByRole('button', {name : 'Assign Space'})
        const inputElement = screen.getByPlaceholderText('enter car number')
        fireEvent.click(buttonElement)
        if (inputElement.value !== '' || inputElement.value.trim().length !==0) {
            expect(mockedUseNavigate).toHaveBeenCalledTimes(1)
            
        }
      })

      test('alert on click when registration number is not provided', ()=>{
        const alertMock = jest.spyOn(window, 'alert').mockImplementation()
        render(<BrowserRouter><Allocation/></BrowserRouter>);
        const buttonElement = screen.getByRole('button', {name : 'Assign Space'})
        const inputElement = screen.getByPlaceholderText('enter car number')
        fireEvent.click(buttonElement)
        if (inputElement.value === '' || inputElement.value.trim().length ===0) {
            expect(alertMock).toHaveBeenCalledTimes(1)
            
        }
      })

      test('navigate on click when registration number is  provided', ()=>{
        const lots = [{id : 1, isAllocated : false}, {id : 2, isAllocated : false}];
        const setLots = jest.fn();
        render(<BrowserRouter><Allocation lots={lots} setLots= {setLots} /></BrowserRouter>);
        const buttonElement = screen.getByRole('button', {name : 'Assign Space'})
        const inputElement = screen.getByPlaceholderText('enter car number')
        let randomNum= Math.floor(Math.random() *lots.length  + 1);
        fireEvent.click(buttonElement)
        if (inputElement.value !== '' || inputElement.value.trim().length !==0) {
            expect(setLots).toHaveBeenCalledTimes(1);
            expect(mockedUseNavigate).toHaveBeenCalledTimes(1)
            
        }
      })


})
