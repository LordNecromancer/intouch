export default function handleMeta(content){
    if(content.createdAt){
        let date;
        if(!content.isEdited){
             date=  new Date(content.createdAt);
            return date.toDateString;
        }else {
            date =  new Date(content.createdAt);

            return "edited at " + date.toDateString();
        }
    }else {
        return "no date";
    }
}