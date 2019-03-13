# AddExpenses Docs

## Table of contents
- [Sequence Diagram](#sequence-diagram)
- [API](#api)
    - [Endpoint URL](#endpoint-url)
    - [Request data](#request-data)
    - [Response](#response)
- [Mockups](#page-mockups)
    - [Form base](#form-base)
    - [Form validation](#form-validation)
    - [Error alert](#error-alert)
    - [Error codes](#error-response-codes)
- [Mobile mockups](#mobile-mockups)
    - [Mobile form base](#mobile-form-base)
    - [Mobile form validation](#mobile-form-validation)
    - [Mobile error alert](#mobile-error-alert)
- [Test cases](#test-cases)

<a name="sequence-diagram"></a>
## Sequence Diagram

@startuml
Client->ExpenseService:{Post} saveExpenses()
ExpenseService->ExpenseRepository:saveExpenses()
ExpenseService->FileService:saveFile()
FileService-->ExpenseService:result
database db
ExpenseRepository->db:query
db-->ExpenseRepository:entities
ExpenseRepository-->ExpenseService:List<Long>
ExpenseService-->Client:List<Long>
@enduml

<a name="api"></a>
## API
<a name="endpoint-url"></a>
### Endpoint URL:
`/delegations/:delegationId/expenses`

<a name="request-data"></a>
### Request data:
**Method: POST**  
(multipart/form-data)
This request will contain photo of reciept ("recieptPhoto": {image})
```
"expenseName": "Expense Name",
"expenseValue": "1234.56",
"expenseCurrency": "dzd",
"receiptPhoto": {image}
```
* `exponseName`: required field
* `expenseValue`: required field, higher than 0
* `expenseCurrency`: required field
 
<a name="response"></a>
### Response:

**Status code:** 200  
**Media type:** application/json  
**Data:** list of ids

`List<Long>`:
```json5
[1, 2]
```
OR

`ApiError`:
```json5
{
  "Message": "Something went wrong",
  "SubErrors": [
    {
      "Message": "More errors"
    }
  ]
}
```

<a name="error-response-codes"></a>
### Possible errors:
* __Http (400)__ if the body includes invalid values + error message in 
* __Http (401)__ if the user is not authenticated
* __Http (403)__ if the user does not have permission
* __Http (404)__ if the delegation was not found

<a name="page-mockups"></a>
## Page Mockups

<a name="form-base"></a>
### Form base:
![Form base mockup](./mockups/form_base.png?raw=true "Base form")

<a name="form-validation"></a>
### Form validation:
![Form validation mockup](./mockups/form_validation.png?raw=true "Form validation")

<a name="error-alert"></a>
### Error alert:
![Error alert](./mockups/error_alert.png?raw=true "Error alert")

<a name="mobile-mockups"></a>
## Mobile mockups

<a name="mobile-form-base"></a>
### Mobile form base:
![Mobile form mockup](./mockups/mobile_base.png?raw=true "Base form")

<a name="mobile-form-validation"></a>
### Mobile form validation:
![Mobile validation mockup](./mockups/mobile_validation.png?raw=true "Form validation")

<a name="mobile-error-alert"></a>
### Mobile error alert:
![Mobile error mockup](./mockups/mobile_error_alert.png?raw=true "Error alert")


<a name="test-cases"></a>
## Test cases:

| Lp. | Typ testu | Nazwa | Warunki wstępne | Kroki wykonania |Oczekiwany rezultat |
| --- | --- | --- | --- | --- | --- |
| 1. | jednostkowy |Dodanie nowego wydatku  do delegacji  poprzez kliknięcie przycisku "Add Expense" |   Istnieje delegacja przypisana do użytkownika, do której można dodać wydatki           |   1. Wpisac treść w pole "Expense name"  2. Podać ścieżkę do pliku ze zdjęciem w pole "Receipt photo"  3. Wprowadzić kwotę wydatku w pole "Amout"  4. Wybrac walutę z listy "Currency". 5. Kliknać przycisk "Add Expense" | Wydatek został dodany do listy wydatków. Lista wydatków zwiększyła się o 1.
|2.| jednostkowy | Dodanie nowego wydatku bez nazwy <br>|     Istnieje delegacja przypisana do użytkownika,<br> do której można dodać wydatki           |   1. Podać ścieżkę do pliku ze zdjęciem w pole "Receipt photo"  2. Wprowadzić kwotę wydatku w pole "Amout"  3. Wybrac walutę z listy "Currency". 4. Kliknać przycisk "Add Expense" | Wyświetlenie się komunikatu pod polem "Expense name" o treści "Expense name is required."
|3.| jednostkowy | Dodanie nowego wydatku bez zdjęcia <br>|     Istnieje delegacja przypisana do użytkownika,<br> do której można dodać wydatki           |   1. Podać ścieżkę do pliku ze zdjęciem w pole "Receipt photo"  2. Wprowadzić kwotę wydatku w pole "Amout"  3. Wybrac walutę z listy "Currency". 4. Kliknać przycisk "Add Expense" | Wyświetlenie się komunikatu pod polem "Reciept photo" o treści "Receipt photo is required."
|4.| jednostkowy | Dodanie nowego wydatku bez kwoty <br>|     Istnieje delegacja przypisana do użytkownika,<br> do której można dodać wydatki           |   1. Wprowadzić nazwę wydatku w pole "Expense name" 2. Podać ścieżkę do pliku ze zdjęciem w pole "Receipt photo"   3. Wybrac walutę z listy "Currency". 4. Kliknać przycisk "Add Expense" | Wyświetlenie się komunikatu pod polem "Amount" o treści "Expense amount is required."
|5.| jednostkowy | Dodanie nowego wydatku bez waluty <br>|     Istnieje delegacja przypisana do użytkownika,<br> do której można dodać wydatki           |   1. Wprowadzić nazwę wydatku w pole "Expense name"  2. Podać ścieżkę do pliku ze zdjęciem w pole "Receipt photo"  3. Wprowadzić kwotę wydatku w pole "Amout"  4. Kliknać przycisk "Add Expense" | Wyświetlenie się komunikatu pod polem "Currency" o treści "Choose currency."
|6.| jednostkowy| Podanie niewłaściwej ścieżki do pliku  <br>|     Isnieje delegacja przypisana do użytkownika,<br> do której można dodać wydatki    | 1. Wprowadzić nazwę wydatku w pole "Expense name"  2. Podać ścieżkę do pliku o rozszerzeniu innym niż *.jpg, *.jpeg, *.png, *.bmp"  3. Wprowadzić kwotę wydatku w pole "Amout"  4. Kliknać przycisk "Add Expense" | Wyświetlenie się komunikatu o niewłaściwym formacie pliku.
|7.| jednostkowy | Podanie pliku o zbyt dużym rozmiarze <br>|     Isnieje delegacja przypisana do użytkownika,<br> do której można dodać wydatki    | 1. Wprowadzić nazwę wydatku w pole "Expense name"  2. Podać ścieżkę do pliku ze zdjęciem o [rozmiarze większym niż dopuszczalny] 3. Wprowadzić kwotę wydatku w pole "Amout"  4. Kliknać przycisk "Add Expense" | Wyświetlenie się komunikatu o zbyt dużym rozmiarze pliku.
|8.| jednostkowy | Próba dodania wydatku bez delegacji | Nie istnieje delegacja przypisana do użytkownika, do której można dodać wydatki |   1. Wpisac treść w pole "Expense name"  2. Podać ścieżkę do pliku ze zdjęciem w pole "Receipt photo"  3. Wprowadzić kwotę wydatku w pole "Amount"  4. Wybrac walutę z listy "Currency". 5. Kliknać przycisk "Add Expense" | Wyświetlenie komunikatu o braku odpowiedniej delegacji, do której można przypisac wydatek. 

`Based on:` [Przypadki testowe. Planowanie przebiegu testów.](https://bulldogjob.pl/articles/244-przypadki-testowe-planowanie-przebiegu-testow) 