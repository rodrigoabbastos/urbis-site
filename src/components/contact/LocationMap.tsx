
const LocationMap = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.144230095956!2d-45.888758423900764!3d-23.199625748492788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cc4a3f6fe044cd%3A0x81c7866defcde640!2sR.%20Dr.%20Orlando%20Feirabend%20Filho%2C%20230%20-%20Parque%20Residencial%20Aquarius%2C%20S%C3%A3o%20Jos%C3%A9%20dos%20Campos%20-%20SP%2C%2012246-190!5e0!3m2!1spt-BR!2sbr!4v1715027301359!5m2!1spt-BR!2sbr"
        width="100%"
        height="250"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Urbis Location"
        className="rounded"
      ></iframe>
    </div>
  );
};

export default LocationMap;
