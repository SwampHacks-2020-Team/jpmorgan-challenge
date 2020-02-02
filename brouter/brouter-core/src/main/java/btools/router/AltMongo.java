package btools.router;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class AltMongo {
    public static AltMongo altMongo;

    private MongoClient client;
    private MongoDatabase database;
    private MongoCollection<Document> coords;

    private AltMongo() {
        client = MongoClients.create("mongodb://sh2020:gftew3cVXUsfLf4Av5EsCecJeDHynxYP@nas.jaxnb.net:26016/SwampHacks2020");
        database = client.getDatabase("SwampHacks2020");
        coords = database.getCollection("coords");
    }


    public MongoCollection<Document> getCoords() {
        return coords;
    }


    public static void initAltMongo() {
        //if(altMongo == null) return;

        altMongo = new AltMongo();
    }
}
