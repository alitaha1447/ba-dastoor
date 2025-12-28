import { useEffect } from "react";

const GoogleReviewWidget = () => {
    useEffect(() => {
        if (document.getElementById("grw-widget-script")) return;

        const script = document.createElement("script");
        script.id = "grw-widget-script";
        script.src = "https://grwapi.net/widget.min.js";
        script.async = true;

        document.body.appendChild(script);
    }, []);

    return (
        <div
            className="review-widget_net"
            data-uuid="77e5b1b0-403a-47ac-ab78-b0bd393ecea1"
            data-template="10"
            data-lang="en"
            data-theme="light"
        >
            Unable to load widget
        </div>
    );
};

export default GoogleReviewWidget;
