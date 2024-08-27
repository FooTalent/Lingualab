import React, { useEffect } from 'react'
import { useAppStore } from '../../store/useAppStore'
import LogoHeader from '../../components/LogoHeader';
import NavBar from '../../components/NavBar';
import NavProfile from '../../components/NavProfile';
import CurrentTime from '../../components/CurrentTime';
import NavAuth from '../Landing/NavAuth';
import Footer from '../Landing/Footer';
import The404message from './404message';

const Error404 = () => {
  const { status, localLogin } = useAppStore()

  useEffect(() => {
    const initialize = async () => {
      if (!status) {
        await localLogin();
      }
    };
    initialize();
  }, [status, localLogin])

  return (
    <>
      {(status) ? (
        <div className='min-h-screen w-full'>
          <div className='bg-Purple'>
            <header className='flex z-40 w-full mx-auto  items-center justify-between max-w-[1210px] h-[48px] md:h-[80px] px-5 py-4'>
              <LogoHeader />
              <NavBar />
              <NavProfile />
            </header>
          </div>
          <div className='flex flex-col mx-auto max-w-[1210px] px-8p box-content pb-10'>
            <CurrentTime />
            <The404message />
          </div>
        </div>
      ) : (
        <div className='min-h-screen w-full'>
          <div className='bg-Purple'>
            <header className='flex items-center justify-between max-w-[1210px] mx-auto h-[80px] py-[16px]'>
              <LogoHeader />
              <NavBar />
              <NavAuth />
            </header>
          </div>
          <div className='flex flex-col mx-auto max-w-full'>
            <The404message />
          </div>
        </div>
      )}
    </>

  )
}

export default Error404