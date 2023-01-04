import ParkingLots from '../pages/ParkingLots';
import {fireEvent, render,screen} from '@testing-library/react'
import { BrowserRouter } from "react-router-dom";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe('ParkingLots', ()=>{

    test('should render correctly', ()=>{

        const lots = [{id : 1, isAllocated : false}]
        const setLotIndex = jest.fn()
        render(<BrowserRouter><ParkingLots lots = {lots} ></ParkingLots> </BrowserRouter>)
        const heading = screen.getByText('Parking Lots')
        expect(heading).toBeInTheDocument();

        const button = screen.getByRole('button',{name :'Allocate Space'})
        expect(button).toBeInTheDocument();

        const parkinglots = screen.getAllByTestId('lots')
        expect(parkinglots.length).toBe(lots.length)
    })

    test('should alert when parking is full', ()=>{
        const alertMock = jest.spyOn(window, 'alert').mockImplementation()
        const lots = [{id : 1, isAllocated : true}]
        const setLotIndex = jest.fn()
        render(<BrowserRouter><ParkingLots lots = {lots} ></ParkingLots> </BrowserRouter>)
        const button = screen.getByRole('button',{name :'Allocate Space'})
        fireEvent.click(button)
        expect(alertMock).toHaveBeenCalledTimes(1);


    })

    test('should navigate if space is available', ()=>{
        const alertMock = jest.spyOn(window, 'alert').mockImplementation()
        const lots = [{id : 1, isAllocated : false}]
        render(<BrowserRouter><ParkingLots lots = {lots} ></ParkingLots> </BrowserRouter>)
        const button = screen.getByRole('button',{name :'Allocate Space'})
        fireEvent.click(button)
        expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
    })

    test('should navigate if space is available', ()=>{
        const alertMock = jest.spyOn(window, 'alert').mockImplementation()
        const lots = [{id : 1, isAllocated : false}]
        const setLotIndex = jest.fn()
        render(<BrowserRouter><ParkingLots lots = {lots} ></ParkingLots> </BrowserRouter>)
        const parkinglots = screen.getAllByTestId('lots')
        fireEvent.click(parkinglots[0])
        expect(mockedUseNavigate).toHaveBeenCalledTimes(1)
    })



    test('should alert when parking is full', ()=>{
        const alertMock = jest.spyOn(window, 'alert').mockImplementation()
        const lots = [{id : 1, isAllocated : false}]
        const setLotIndex = jest.fn()
        render(<BrowserRouter><ParkingLots lots = {lots} ></ParkingLots> </BrowserRouter>)
        const parkingLots = screen.getAllByTestId('lots')
        fireEvent.click(parkingLots[0])
        expect(alertMock).toHaveBeenCalledTimes(1);
    })


})