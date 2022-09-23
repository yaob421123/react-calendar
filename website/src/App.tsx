import Calendar from '@ahws/react-calendar';

const App = () => {
  const onDay = (d: any) => {
    console.log(d);
  };
  return (
    <div style={{ maxWidth: 750, margin: '0 auto' }}>
      <Calendar onChange={onDay} />
    </div>
  );
};

export default App;
