import "../css/help_common.css"
function Help_FAQ() {
    function handle() {
        var coll = document.getElementsByClassName("collapsible");
        var i;
        
        for (i = 0; i < coll.length; i++) {
          coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
              content.style.display = "none";
            } else {
              content.style.display = "block";
            }
          });
        }
    }
    return (
        <div className="faq_main">

            <div className="collapsible" onClick={handle}>Will QuickCrave be accountable for quality/quantity?</div>
            <div className="content">
                <p>Quantity and quality of the food is the restaurants' responsibility. However in case of issues with the<br /> quality or quantity, kindly submit your feedback and we will pass it on to the restaurant.</p>
            </div>
            <div className="collapsible" onClick={handle}>Unable to view the details in my profile</div>
            <div className="content">
                <p>Please check if your app is due for an update. If not, please share the details via support@quickcrave.in</p>
            </div>
            <div className="collapsible" onClick={handle}>Can I change the address / number?</div>
            <div className="content">
                <p>Any major change in delivery address is not possible after you have placed an order with us.<br /> However, slight modifications like changing the flat number, street name, landmark etc. are allowed. </p>
            </div>
            <div className="collapsible" onClick={handle}>What are your delivery hours?</div>
            <div className="content">
                <p>Our delivery hours vary for different locations and depends on availability of supply from restaurant partners.</p>
            </div>
            <div className="collapsible" onClick={handle}>How long do you take to deliver?</div>
            <div className="content">
                <p>Standard delivery times vary by the location selected and prevailing conditions. Once you select your <br /> location, an estimated delivery time is mentioned for each restaurant.</p>
            </div>

        </div>
    );
}
export default Help_FAQ