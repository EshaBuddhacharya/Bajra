import {ShoppingBasket} from 'lucide-react'

export default function HoveringCart () { 
    return (
        <>
        <div className="d-md-block" style={{
        position: 'fixed',
        bottom: '2rem',
        right: '3rem',
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '50%',
        boxShadow: '0 2px 5px rgba(0,0,0,0.4)',
        cursor: 'pointer'
      }}>
        <ShoppingBasket />
      </div>
        </>
    )
}