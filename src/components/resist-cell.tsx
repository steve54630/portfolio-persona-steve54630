export type ResistTabItem = {
  element: string;
  type: "resist" | "weak" | "neutral";
};

const ResistanceCell = ({ element, type }: ResistTabItem) => {
      return (
        <div key={element} className="flex flex-col gap-2">
          <img
            src={`/images/elements/${element}.png`}
            alt={element}
            className="w-100"
          />
          <hr className="border-gray-400" />
          <img
            src={`/images/resists/${type}.png`}
            alt={type}
            className="w-100"
          />
        </div>
      );
    };

export default ResistanceCell