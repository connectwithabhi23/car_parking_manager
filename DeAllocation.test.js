import DeAllocation from "../pages/DeAllocation";
import {fireEvent, render,screen} from '@testing-library/react'
import { BrowserRouter } from "react-router-dom";

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe('DeAllocation', ()=>{

         test('render deallocation component correctly',()=>{
          const lots = [{id : 1, isAllocated : true}]
          const setLots = jest.fn();
          render(<BrowserRouter><DeAllocation lots={lots} setLots={setLots}></DeAllocation></BrowserRouter>)

               const heading = screen.getByText('Remove this Parked Car')
               expect(heading).toBeInTheDocument();

               const paragraphs = screen.getAllByRole('paragraph')
                expect(paragraphs.length).toBe(10)

                const button = screen.getByRole('button')
                expect(button).toBeInTheDocument()
         })

         test('should deallocate lot and navigate to parking lot',()=>{
          const lots = [{id : 1, isAllocated : true}]
          const setLots = jest.fn()
          render(<BrowserRouter><DeAllocation  lots={lots} setLots={setLots} ></DeAllocation></BrowserRouter>)
               const button = screen.getByRole('button')
               fireEvent.click(button)
               expect(setLots).toHaveBeenCalled()
               expect(mockedUseNavigate).toHaveBeenCalled()
         })
})