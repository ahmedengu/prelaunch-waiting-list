// components/Layout.js
function Layout(props) {
    return (
        <div className="page-layout">
            {props.children}
            <style jsx global>{`

        h1, .lead, .checkMail_section h4 , h3 {
            font-family: 'Signika', sans-serif;
        }

        .header_logo {
            margin-top: 5%;
        }

        input:focus {
        transition: all 0.8s ease-in-out;
        }

        .lead {
            margin-left: 2%;
        }

        .select-box {
            cursor: pointer;
            max-width:  20em;
        }
        
        .select,
        .label {
            color: #414141;
            font: 400 17px/2em 'Signika', sans-serif;
        }
        
        .select {
            height: 40px;
            border: 0 none;
        }
            
          .signup_form {
              width: 75%;
          }

          .signup_form-email:focus {
            transition: all .4s ease-in-out;
            font-size: 110%:
          }

        .header_selectBox {
            left: 5%;
        }

        .header_social {
            right: 5%;
        }

        .spacing {
            letter-spacing: .5px ;
        }
        
        .lighter {
            font-weight : lighter;
        }

        .checkMail_section {
            background-color: #25d366 ;
        }

        .checkMail_section-btn {
            background-color: white;
            border-radius: 6px;
            color: #343a40;
            transition: all .5s ease-in-out;
            
        }

        .checkMail_section-btn:hover {
            background-color: #25d366;
            color: white;
            font-weight: bold;
            transition: all .5s ease-in-out;
        }

        .extraMargin {
            margin-top: 1%;
            margin-bottom: .5%;
        }

        .footer {
            background-color: #444444;
        }

        .full-width {
            width: 100%;
            color: white;
        }

        .white-icon {
            color: white;
        }

        .footer-large {
            padding: 0 !important
        }

        .footer h3 {
            color: white;
            text-align: center;
            margin-left: 3%;
        }
        

        `}</style>
        </div>
    )
}

export default Layout