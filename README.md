# Instructions

You can turn a Church program (e.g., `tests/simple.church`) into Javascript using BiwaScheme (interpreter) or Scheme2js (compiler).

To use BiwaScheme, run:

    bher -c biwa tests/simple.church

To use Scheme2js, run:

    bher -c scheme2js tests/simple.church

This generates `tests/simple.church.html`. Open this file in a browser to run the Church program in Javascript.
