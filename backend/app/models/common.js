const dict = {
    TASK_TYPE_DAY:0,
    TASK_TYPE_YES_NO: 1,
    TASK_TYPE_CELTIC: 2,
    TASK_TYPE_THREE: 3,
    TASK_TYPE_QUESTION: 4,
    TASK_TYPE_FIVE: 5,

    TASK_STATUS_DEFAULT:0,
    TASK_STATUS_RUNNING:1,
    TASK_STATUS_SUCCESS:2,
}

function getCardNamesFromTask(task) {
    task = taskSimplify(task);

    let card_names = [];
    task.selected_cards.forEach(selected_card => {
        task.cards.forEach(card => {
            if (card.id === selected_card) {
                card_names.push(card.name);
            }
        })
    });

    return card_names;
}

function taskSimplify(task) {
    return {
        task_uid:task.uid,
        type:task.type,
        subtype:task.subtype,
        status:task.status,
        like:task.like || 0,
        cards:JSON.parse(task.cards || "[]"),
        selected_cards:JSON.parse(task.selected_cards || "[]"),
        processed_cards:JSON.parse(task.processed_cards || "[]"),
        description:task.description,
        updated_at:task.updatedAt,
        created_at:task.createdAt,
    }
}

function userSimplify(user) {
    return {
        user_uid:user.uid,
        name:user.name,
        sex:user.sex,
        date_birth:user.date_birth,
        occupation:user.occupation,
        relationship:user.relationship,
    }
}

module.exports = {
    taskSimplify,
    userSimplify,
    dict,
    getCardNamesFromTask
}