<?php

class Objectlist {
    public $result = '';

    public function getTree($object, $method)
    {
        $this->result = "<div onclick='".$method."'>";
        $this->result .= '<ul class="Container">';

        foreach ($object as $key => $value) {
            $this->result .= '<li class="Node IsRoot ExpandClosed"><div class="Expand"></div><div class="Content">' . $key . '</div>';
            $this->getList($key, $value);
        }
        $this->result .= '</ul>';
        $this->result .= '</div>';
        return $this->result;
    }


    public function getList($key, $value)
    {
        if (is_object($value)) {
            $value = get_class($value);
        }
        if (is_array($value)) {
            ksort($value);
            foreach ($value as $k => $v) {
                $this->result .= '<ul class="Container">';
                $this->result .= '<li class="Node ExpandClosed">';
                $this->result .= '<div class="Expand"></div>';
                $this->result .= '<div class="Content">' . $k . '</div>';
                $this->getList($k, $v);
                $this->result .= '</li></ul>';
            }
        } else {
            if (!is_numeric($value) && !is_string($value) && !empty($value)) { // пропуск объектов
                $value = 'OBJ';
            }
            $this->result .= '<ul class="Container">';
            $this->result .= '<li class="Node ExpandLeaf IsLast">';
            $this->result .= '<div class="Expand"></div>';
            $this->result .= '<div class="Content">' . $key . ' => ' . $value . '</div>';
            $this->result .= '</li></ul>';
        }
        return $this->result;
    }
}