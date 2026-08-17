module meetmalaga.meetmalaga {
  requires javafx.controls;
  requires javafx.fxml;
  requires kotlin.stdlib;


  opens meetmalaga.meetmalaga to javafx.fxml;
  exports meetmalaga.meetmalaga;
}
