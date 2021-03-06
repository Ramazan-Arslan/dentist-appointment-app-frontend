import getRequest from '../../server-connections/getRequest'
import postRequest from '../../server-connections/postRequest'


const helpers = {
    getAppointments: async function () {
        var path = "/api/v1/appointments";
        const obj = await getRequest(path);
        return obj;
    },

    loadItems: async function (patient_name, selectedDentists, selectedTreatments, startLong, endLong) {

        var jsonArray = await this.getAppointments();
        var newItems = [];

        if (Boolean(jsonArray)) {

            jsonArray.map(e => {
                var start = this.getStartDate(e.date, e.hour);
                var end = this.getEndDate(e.date, e.hour);

                if ((Boolean(patient_name) && e.patient_name.includes(patient_name)) || !Boolean(patient_name)) {
                    if ((Boolean(selectedDentists) && selectedDentists.includes(e.doctor.full_name)) || !Boolean(selectedDentists)) {
                        if ((Boolean(selectedTreatments) && selectedTreatments.includes(e.type.type)) || !Boolean(selectedTreatments)) {
                            if (((startLong !== 0 && endLong !== 0) && startLong <= e.date && e.date <= endLong) || (startLong === 0 && endLong === 0)) {
                                newItems.push(
                                    {
                                        id: e.id,
                                        title: e.patient_name,
                                        start: start,
                                        end: end,
                                        date: e.date,
                                        hour: e.hour,
                                        doctor: {
                                            id: e.doctor.id,
                                            full_name: e.doctor.full_name,
                                            phone: e.doctor.phone
                                        },
                                        patient_name: e.patient_name,
                                        patient_gender: e.patient_gender,
                                        patient_phone: e.patient_phone,
                                        patient_age: e.patient_age,
                                        type: {
                                            id: e.type.id,
                                            type: e.type.type,
                                            price: e.type.price
                                        },
                                        description: e.description

                                    });
                            }
                        }
                    }
                }

            })

        }
        return newItems;


    },

    getStartDate: function (long, hour) {
        var startArray = hour.split("-")[0];
        var startHour = startArray.split(".")[0];
        var startMinute = startArray.split(".")[1];

        var startingDate = new Date(long);
        startingDate.setHours(startHour, startMinute, 0, 0);

        return startingDate;
    },

    getEndDate: function (long, hour) {
        var endArray = hour.split("-")[1];
        var endHour = endArray.split(".")[0];
        var endMinute = endArray.split(".")[1];

        var endingDate = new Date(long);
        endingDate.setHours(endHour, endMinute, 0, 0);

        return endingDate;
    },

    removeAppointment: async function (appointmentId) {
        var path = "/api/v1/delete/appointment/" + appointmentId;
        const isTrue = await postRequest(path, null);

        if (isTrue) {
            alert("Removed")
            window.location.reload(true);
        }
        else {
            alert("Error occured")
        }
    },

    updateAppointment: async function (json) {
        var path = "/api/v1/update/appointment";
        const isTrue = await postRequest(path, json);

        if (isTrue) {
            alert("Updated")
            window.location.reload(true);
        }
        else {
            alert("Error occured")
        }
    },

    removeAppointmentsWithRange: async function (startDate, endDate, dentist) {

        const events = await this.getAppointments();

        if (Boolean(events)) {
            await events.map(async (e) => {
                var start = this.getStartDate(e.date, e.hour);
                var end = this.getEndDate(e.date, e.hour);
                if (dentist === (e.doctor.full_name)) {
                    if (((startDate !== 0 && endDate !== 0) && startDate <= start.getTime() && end.getTime() <= endDate)) {

                        var path = "/api/v1/delete/appointment/" + e.id;
                        const isTrue = await postRequest(path, null);
                        console.log(isTrue)
                        if (!isTrue) {
                            console.log("Not removed : ", e)
                        }
                    }

                }
            })

            alert("Process is finished")
            window.location.reload(true);

        }
    }
};

export default helpers;