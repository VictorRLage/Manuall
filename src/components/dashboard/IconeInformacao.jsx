import { InformationCircleIcon } from "@heroicons/react/24/solid";

const InfoIcon = ({ tooltipId, tooltipContent, tooltipPlace }) => (
    <InformationCircleIcon
        className="h-6 absolute top-2 right-2"
        data-tooltip-id={tooltipId}
        data-tooltip-content={tooltipContent}
        data-tooltip-place={tooltipPlace}
    />
);

export default InfoIcon;
