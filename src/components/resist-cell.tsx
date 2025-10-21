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
            className="sm:w-24 w-20"
          />
          <hr className="border-gray-400" />
          <img
            src={`/images/resists/${type}.png`}
            alt={type}
            className="sm:w-24 w-20"
          />
        </div>
      );
    };

export default ResistanceCell