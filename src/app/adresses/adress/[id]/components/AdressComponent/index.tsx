import { AdressType } from "@/@types/AdressType";

export default function AdressComponent({adress}:{adress: AdressType}) {
  return (
    <div
      style={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
      className="flex justify-center items-center flex-wrap bg-white px-5 py-2 mt-2"
    >
      <div className="flex flex-col justify-center items-start mt-5 flex-1">
        <h3 className="text-items-start p-2 rounded">
          <strong>Logradouro </strong>
          {adress.logradouro}
        </h3>
        <h3 className="text-items-start p-2 rounded">
          <strong>Bairro </strong>
          {adress.bairro}
        </h3>
        <h3 className="text-items-start p-2 rounded">
          <strong>Localidade </strong>
          {adress.localidade}
        </h3>
        <h3 className="text-items-start p-2 rounded">
          <strong>Estado </strong>
          {adress.uf}
        </h3>
        <h3 className="text-items-start p-2 rounded">
          <strong>DDD </strong>
          {adress.ddd}
        </h3>
        <h3 className="text-items-start p-2 rounded">
          <strong>IBGE </strong>
          {adress.ibge}
        </h3>
        <h3 className="text-items-start p-2 rounded">
          <strong>SIAFI </strong>
          {adress.siafi}
        </h3>
      </div>
      <iframe
        className="flex-1 h-full min-h-[250px] max-[400px]:hidden border-black border-[1.5px]"
        id="gmap_canvas"
        src={`https://maps.google.com/maps?q=${adress.bairro}%2C+${adress.localidade}&t=&z=20&ie=UTF8&iwloc=&output=embed`}
      ></iframe>
    </div>
  );
}
