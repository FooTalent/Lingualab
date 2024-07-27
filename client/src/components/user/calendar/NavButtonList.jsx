import React from 'react'
import NavButton from './NavButton'

export default function NavButtonList({ onNavigate, onView }) {
    const navButtons = [

    ]
    return (
        <div className="flex justify-between">
            <div>
                {
                    navButtons.map((item, index) => {
                        return (
                            index < 2 ? <NavButton label={item.label} /> : <></>
                        )
                    })
                }
            </div>

            <div>
                {
                    navButtons.map((item, index) => {
                        return (
                            index >= 2 ? <NavButton label={item.label} /> : <></>
                        )
                    })
                }
            </div>
        </div>
    )
}
