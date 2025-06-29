import { useEffect } from 'react';

const CustomCursor = () => {
  useEffect(() => {
    const dot = document.getElementById('cursor-dot');
    const tail = document.getElementById('cursor-tail');

    let tailX = 0, tailY = 0;

    const moveHandler = (e) => {
      const { clientX, clientY } = e;

      dot.style.top = `${clientY}px`;
      dot.style.left = `${clientX}px`;

      // Slower interpolation for longer tail
      tailX += (clientX - tailX) * 0.08;
      tailY += (clientY - tailY) * 0.08;

      tail.style.top = `${tailY}px`;
      tail.style.left = `${tailX}px`;
    };

    const clickDownHandler = () => {
      dot.classList.add('glow');
    };

    const clickUpHandler = () => {
      dot.classList.remove('glow');
    };

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mousedown', clickDownHandler);
    document.addEventListener('mouseup', clickUpHandler);

    return () => {
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mousedown', clickDownHandler);
      document.removeEventListener('mouseup', clickUpHandler);
    };
  }, []);

  return (
    <>
      <div
        id="cursor-dot"
        className="fixed w-[10px] h-[10px] bg-blue-500 rounded-full z-[9999] pointer-events-none transition-shadow duration-200"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        id="cursor-tail"
        className="fixed w-[60px] h-[20px] bg-blue-500/15 rounded-full z-[9998] pointer-events-none transition-transform duration-100 ease-out"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <style>
        {`
          .glow {
            box-shadow: 0 0 25px 6px rgba(59, 130, 246, 0.7);
          }
        `}
      </style>
    </>
  );
};

export default CustomCursor;
