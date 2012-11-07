## Listen MercadoLibre/MercadoLivre notifications

This applications is writen in node.js and it listens MELI (MercadoLibre/MercadoLivre) notifications from 3 different API resources (questions, items, oders).

For further details about notifications, please visit: http://developers.mercadolibre.com/notifications/


## In order to use this example you will need to:

- create an application (http://developers.mercadolibre.com/application-manager/), and configure a notification_callback_url
- deploy this example where MELI can notify your app about the events previously mentioned, ex: http://www.heroku.com/, Procfile is included
- a user that accept your app, and yes, YOU can be that first user, executing this POST


    POST /users/<your_meli_user_id>/applications
    {
        "app_id": <your_app_id>,
        "scopes":["read","write"]
    }


Enjoy!