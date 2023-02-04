'use strict';

// Выход из личного кабинета
const logoutButton = new LogoutButton();

logoutButton.action = function() {
  const callbackLogout = (responseBody) => {
    if (responseBody.success) {
      location.reload();
    } else {

    }
  }
  try {
    ApiConnector.logout(callbackLogout);
  } catch (error) {
    
  }
}

// Получение информации о пользователе
const currentProfileCallback = (responseBody) => {
  if (responseBody.success) {
    ProfileWidget.showProfile(responseBody.data);
  } else {

  }
};

ApiConnector.current(currentProfileCallback);

// Получение текущих курсов валюты
const ratesBoard = new RatesBoard();

const stocksCallback = (responseBody) => {
  if (responseBody.success) {
    ratesBoard.fillTable(responseBody.data);
  } else {
    ratesBoard.clearTable();
  }
}

ApiConnector.getStocks(stocksCallback)


// Операции с деньгами
const moneyManager = new MoneyManager();

// добавление
moneyManager.addMoneyCallback = function (data) {
  const callback = (responseBody) => {
    if (responseBody.success) {
      ProfileWidget.showProfile(responseBody.data);
    }

    this.setMessage(responseBody.success, responseBody.success ? 'Успешно' : responseBody.error)
  }

  ApiConnector.addMoney(data, callback);
};

// конвертирование
moneyManager.conversionMoneyCallback = function (data) {
  const callback = (responseBody) => {
    if (responseBody.success) {
      ProfileWidget.showProfile(responseBody.data);
    }

    this.setMessage(responseBody.success, responseBody.success ? 'Успешно' : responseBody.error)
  }

  ApiConnector.convertMoney(data, callback);
};

// перевод
moneyManager.sendMoneyCallback = function (data) {
  const callback = (responseBody) => {
    if (responseBody.success) {
      ProfileWidget.showProfile(responseBody.data);
    }

    this.setMessage(responseBody.success, responseBody.success ? 'Успешно' : responseBody.error)
  }

  ApiConnector.transferMoney(data, callback);
};


// Работа с избранным
const favoritesWidget = new FavoritesWidget();

// Запросите начальный список избранного
const getFavoritesCallback = (responseBody) => {
  if (responseBody.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(responseBody.data);
    moneyManager.updateUsersList(responseBody.data);
  }
};

ApiConnector.getFavorites(getFavoritesCallback);


// Реализуйте добавления пользователя в список избранных
favoritesWidget.addUserCallback = function (data) {
  const callback = (responseBody) => {
    if (responseBody.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(responseBody.data);
      moneyManager.updateUsersList(responseBody.data);
    }

    this.setMessage(responseBody.success, responseBody.success ? 'Успешно' : responseBody.error);
  };

  ApiConnector.addUserToFavorites(data, callback);
};

// Реализуйте удаление пользователя из избранного
favoritesWidget.removeUserCallback = function (userId) {
  const callback = (responseBody) => {
    if (responseBody.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(responseBody.data);
      moneyManager.updateUsersList(responseBody.data);
    }

    this.setMessage(responseBody.success, responseBody.success ? 'Успешно' : responseBody.error);
  };

  ApiConnector.removeUserFromFavorites(userId, callback);
};

