function BounceLoader() {
  let circleCommonClasses = 'h-3 w-3 bg-indigo-500 rounded-full';
    
  return (
    <div className='flex'>
          <div className={`${circleCommonClasses} mr-1.5 animate-bounce`}></div>
          <div className={`${circleCommonClasses} mr-1.5 animate-bounce200`}></div>
          <div className={`${circleCommonClasses} animate-bounce400`}></div>
    </div>
  );
}

export default BounceLoader
